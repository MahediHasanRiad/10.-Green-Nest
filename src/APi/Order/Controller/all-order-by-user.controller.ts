import { prisma } from "../../../lib/prisma.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { QueryType } from "../../User/user-type.js";
import createError from "http-errors";
import { FilterOrderByUser } from "../Repository/filter-order-by-user.repository.js";
import { Pagination } from "../../../Utils/pagination.js";
import { apiResponse } from "../../../Utils/apiResponse.js";

export const AllOrderByUserController = asyncHandler(async (req, res) => {
  /**
   * get {page, limit, sortBy, sortType, search} = req.query
   * get user = req.user
   * if(!user) unauthorrized
   * get all order by user
   * add links in per order
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

  // filter user by search
  const filterOrder = await FilterOrderByUser({
    page,
    limit,
    sortBy,
    sortType,
    search,
    userId,
  });

  // add links
  const ordered = filterOrder.map((order) => ({
    ...order,
    links: {
      self: `/product-orders`,
      CustomerLink: `/users/${order.userId}`,
      ProductLink: `/products/${order.productId}`,
      VendorLink: `/vendors/${order.vendorId}`,
    },
  }));

  // pagination
  const totalItems = await prisma.order.count({
    where: {
      userId: userId,
      product: { name: { contains: search, mode: "insensitive" } },
    },
  });

  const pagination = await Pagination(page, limit, totalItems, 'product-orders')


  // res
  res.status(200).json(new apiResponse(200, {ordered, pagination}))
});
