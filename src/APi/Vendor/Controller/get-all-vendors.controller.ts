import { prisma } from "../../../lib/prisma.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { QueryType } from "../../User/user-type.js";
import createError from "http-errors";
import { FilterBySearch } from "../Repository/filter-by-search.repository.js";
import { Pagination } from "../../../Utils/pagination.js";
import { apiResponse } from "../../../Utils/apiResponse.js";

export const getAllVendorsController = asyncHandler(async (req, res) => {
  /**
   * get {page, limit, sortType, sortBy, search} = req.query
   * get userId = req.user.id
   * if(!userId) throw error
   * filter by search
   * add link in vendor profile
   * add pagination and links
   * res
   */

  let {
    page = 1,
    limit = 10,
    sortType = "updatedAt",
    sortBy = "desc",
    search = "",
  } = req.query as QueryType;

  const userId = req.user?.id as string;
  if (!userId) throw createError(401, "Unauthorized !!!");

  // filter by search
  const filterVendors = await FilterBySearch({
    page,
    limit,
    sortType,
    sortBy,
    search,
  });

  // add links
  const vendors = filterVendors.map(vendor => ({
    ...vendor,
    links: {
      self: `/vendors`,
      userLink: `/users/${vendor.userId}`
    }
  }))

  // add pagination
  const totalItems = await prisma.vendor.count({
    where: { user: { name: { contains: search, mode: "insensitive" } } },
  });

  const pagination = Pagination(page, limit, totalItems, 'vendors')

  // res
  res.status(200).json(new apiResponse(200, {vendors, pagination}))
});
