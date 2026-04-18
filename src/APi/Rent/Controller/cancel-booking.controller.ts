import { asyncHandler } from "../../../Utils/asyncHandler.js";
import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import createError from "http-errors";


export const CancelBookingController = asyncHandler(async (req, res) => {
  /**
   * get userId = req.user
   * if(!userId) return error
   * verify permisssion
   * update status
   * res
   */
  
  const userId = req.user?.id as string;
  if (!userId) throw createError(401, "Unauthorized !!!");

  const bookedId = req.params.bookedId as string;
  if (!bookedId) throw createError(400, "Param id are required !!!");

  // find booked space
  const bookedSpace = await prisma.rent.findFirst({ where: { id: bookedId } });
  if (!bookedSpace) throw createError(404, "not booking space found !!!");

  // verify permission
  if (bookedSpace.userId !== userId && req.user?.role !== "ADMIN")
    throw createError(
      403,
      "Does not have permission to Update this Product Status !!!",
    );

  // update
  const space = await prisma.rent.update({
    where: { id: bookedSpace.id },
    data: { status: 'CANCELLED' },
  });


  // res
  res.status(200).json(new apiResponse(200, space))

})