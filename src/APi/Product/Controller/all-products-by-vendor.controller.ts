import { prisma } from "../../../lib/prisma.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { QueryType } from "../../User/user-type.js";
import createError from "http-errors";
import { GetProductByVendor } from "../Repository/get-product-by-vendor.repository.js";
import { Pagination } from "../../../Utils/pagination.js";
import { apiResponse } from "../../../Utils/apiResponse.js";

export const AllProductsByVendorController = asyncHandler(async (req, res) => {
  /**
   * get {page, limit, sortBy, sortType, search} = req.query
   * get user = req.user
   * if(!user) unauthorrized
   * get all product by vendor
   * add links in per product
   * add pagination
   * res
   */

  const {
    page = 1,
    limit = 10,
    sortBy = "desc",
    sortType = "updatedAt",
    search = "",
  } = req.query as QueryType;

  const userId = req.user?.id as string;
  if (!userId) throw createError(401, "Unauthorized !!!");

  const vendorId = req.params.vendorId as string;
  if (!vendorId) throw createError(400, "Param id required !!!");

  // find vendor
  const vendor = await prisma.vendor.findFirst({ where: { id: vendorId } });
  if (!vendor) throw createError(404, "vendor not found !!!");

  // get all products by vendor based on search
  const getProducts = await GetProductByVendor({
    page,
    limit,
    vendorId,
    sortBy,
    sortType,
    search,
  });

  // add links
  const products = getProducts.map((product) => ({
    ...product,
    links: {
      self: `/products/${product.id}`,
      vendorLink: `/vendors/${product.vendorId}`,
    },
  }));

  // pagination
  const totalItems = await prisma.product.count({
    where: {
      vendorId: vendor.id,
      name: { contains: search, mode: "insensitive" },
    },
  });
  const pagination = Pagination(page, limit, totalItems, 'vendor-products');


  // res 
  res.status(200).json(new apiResponse(200, {products, pagination}))
});
