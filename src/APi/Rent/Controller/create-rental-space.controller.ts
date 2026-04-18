import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from "http-errors";

interface InputType {
  rentalSpaceId: string;
  duration: string;
}

export const CreateRentalSpaceController = asyncHandler(async (req, res) => {
  /**
   * get {rentalSpaceId, duration} = req.body
   * get userId = req.user
   * if(!userId) return error
   * find vendor using rentalSpaceId
   * create
   * res
   */

  const { rentalSpaceId, duration } = req.body as InputType;

  if (!rentalSpaceId || !duration)
    throw createError(400, "rentalSpaceId & duration both are required !!!");

  const userId = req.user?.id as string;
  if (!userId) throw createError(401, "Unauthorized !!!");


  // find vendor using rentalSpaceId
  const rentalSpace = await prisma.rentalSpace.findFirst({
    where: { id: rentalSpaceId },
  });
  if (!rentalSpace) throw createError(404, "rental space not found !!!");


  // create
  const create = await prisma.rent.create({
    data: {
      userId: userId,
      rentalSpaceId: rentalSpaceId,
      vendorId: rentalSpace.vendorId,
      duration: duration,
    },
  });

  // update rental-space status
  await prisma.rentalSpace.update({
    where: { id: rentalSpaceId },
    data: {availability: false},
  });

  // res 
  res.status(201).json(new apiResponse(201, create))
});
