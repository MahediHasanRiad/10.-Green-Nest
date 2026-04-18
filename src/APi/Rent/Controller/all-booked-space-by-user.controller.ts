import { prisma } from "../../../lib/prisma.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { QueryType } from "../../User/user-type.js";
import createError from "http-errors";
import { FilterBookedSpace } from "../Repository/filter-space-by-user.repository.js";
import { Pagination } from "../../../Utils/pagination.js";
import { apiResponse } from "../../../Utils/apiResponse.js";

export const AllBookedSpaceByUser = asyncHandler(async (req, res) => {
  /**
   * get {page, limit, sortBy, sortType, search} = req.query
   * get user = req.user
   * if(!user) unauthorrized
   * get all booked-space by user
   * add links in per space
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

  // get all booked space by user
  const filterSpaces = await FilterBookedSpace({
    page,
    limit,
    sortBy,
    sortType,
    search,
    userId,
  });

  // add links
  const bookedSpace = filterSpaces.map((space) => ({
    ...space,
    links: {
      Self: `/all-booked-spaces-by-user`,
      CustomerLink: `/users/${space.userId}`,
      VendorLink: `/vendors/${space.vendorId}`,
      RentalSpaceLink: `/rental-sapces/${space.rentalSpaceId}`,
    },
  }));

  // pagination
  const totalItems = await prisma.rent.count({
    where: {
      userId: userId,
      rentalSpace: { location: { contains: search, mode: "insensitive" } },
    },
  });
  const pagination = Pagination(page, limit, totalItems, 'all-booked-spaces-by-user')


  // res 
  res.status(200).json(new apiResponse(200, {bookedSpace, pagination}))

});
