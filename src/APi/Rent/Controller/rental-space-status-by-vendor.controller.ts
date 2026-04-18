import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from "http-errors";

export const UpdateRentalSpaceStatus = asyncHandler(async (req, res) => {
  /**
   * get {status} = req.body
   * if(!status) return error
   * verify permission
   * update status
   * res
   */

  const { availability } = req.body;
  if (!availability)
    throw createError(400, "availability field are required !!!");

  const rentalSpaceId = req.params.rentalSpaceId as string;
  if (!rentalSpaceId) throw createError(400, "Param id are required !!!");

  const userId = req.user?.id as string;
  if (!userId) throw createError(401, "Unauthorized !!!");

  // find booked space
  const bookedSpace = await prisma.rentalSpace.findFirst({ where: { id: rentalSpaceId } });
  if (!bookedSpace) throw createError(404, "not booking space found !!!");

  // verify permission
  const vendor = await prisma.vendor.findFirst({ where: { userId: userId } });
  if (bookedSpace.vendorId !== vendor?.id && req.user?.role !== "ADMIN")
    throw createError(
      403,
      "Does not have permission to Update this Product Status !!!",
    );

  // update
  const space = await prisma.rentalSpace.update({
    where: { id: bookedSpace.id },
    data: { availability: availability },
  });


  // res
  res.status(200).json(new apiResponse(200, space))
});
