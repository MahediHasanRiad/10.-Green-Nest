import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from "http-errors";

export const FindSingleBookedSpace = asyncHandler(async (req, res) => {
  const bookedId = req.params.bookingId as string;
  if (!bookedId) throw createError(400, "Param id required !!!");

  // find booked space
  const bookedSpace = await prisma.rent.findFirst({
    where: { id: bookedId },
    include: {
      rentalSpace: { select: { location: true, size: true, price: true } },
    },
  });

  // add links
  const links = {
    self: `/booked-spaces/${bookedId}`,
    CustomerLink: `/users/${bookedSpace?.userId}`,
    VendorLink: `/vendors/${bookedSpace?.vendorId}`,
    RentalSpaceLink: `/rental-spaces/${bookedSpace?.rentalSpaceId}`,
  };

  // res
  res.status(200).json(new apiResponse(200, { bookedSpace, links }));
});
