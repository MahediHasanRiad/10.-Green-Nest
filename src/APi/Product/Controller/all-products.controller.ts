import { asyncHandler } from "../../../Utils/asyncHandler.js";
import { prisma } from "../../../lib/prisma.js";
import type { QueryType } from "../../User/user-type.js";
import createError from "http-errors";
import { Pagination } from "../../../Utils/pagination.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { GetAllProducts } from "../Repository/all-product.repository.js";


export const AllProductsController = asyncHandler(async(req, res) => {
  /**
   * get {page, limit, sortBy, sortType, search} = req.query
   * get user = req.user
   * if(!user) unauthorrized
   * get all product
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

  // find vendor
  const vendor = await prisma.vendor.findFirst({ where: { userId: userId } });
  if (!vendor) throw createError(404, "vendor not found !!!");

  // get all products by vendor based on search
  const getProducts = await GetAllProducts({
    page,
    limit,
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
})