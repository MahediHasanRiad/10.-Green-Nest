import { asyncHandler } from "../../../Utils/asyncHandler.js";
import { prisma } from "../../../lib/prisma.js";
import type { QueryType } from "../../User/user-type.js";
import createError from "http-errors";
import { Pagination } from "../../../Utils/pagination.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { FilterRentalSpaceByUser } from "../Repository/Filter-rental-space-by-user.repository.js";



export const AllRentalSpaceByUser = asyncHandler(async(req, res) => {
/**
   * get {page, limit, sortBy, sortType, search} = req.query
   * get user = req.user
   * if(!user) unauthorrized
   * get all rental-space by vendor
   * add links in per rental-space
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

  const userId = req.user?.id;
  if (!userId) throw createError(401, "Unauthorized !!!");

  // find vendor
  const vendor = await prisma.vendor.findFirst({where: {userId: userId}})
  if(!vendor) throw createError(404, 'no Rental space found under this vendor !!!')

  // filter all rental space
  const filterSpace = await FilterRentalSpaceByUser({
    page,
    limit,
    sortBy,
    sortType,
    search,
    userId
  });

  // add links
  const rentalSpace = filterSpace.map((space) => ({
    ...space,
    links: {
      self: `/rental-spaces/${space.id}`,
      vendorLink: `/users/${userId}`,
    },
  }));

  // pagination
  const totalItems = await prisma.rentalSpace.count({
    where: { location: { contains: search, mode: "insensitive" } },
  });

  const pagination = Pagination(page, limit, totalItems, 'rental-spaces')

  // res 
  res.status(200).json(new apiResponse(200, {rentalSpace, pagination}))
})