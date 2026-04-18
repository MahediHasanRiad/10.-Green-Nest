import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from "http-errors";

interface InputType {
  certifyingAgency: string;
  certificationDate: string;
}

export const CreateSustainabilityController = asyncHandler(async (req, res) => {
  /**
   * get {certifyingAgency, certificationDate} = req.body
   * if (empty) return error
   * get userId = req.user.id
   * if(!userId) throw error
   * create
   * res
   */

  const { certifyingAgency, certificationDate } = req.body as InputType;

  if (!certifyingAgency || !certificationDate)
    throw createError(
      400,
      "certifyingAgency & certificationDate both are required !!!",
    );

  // get user
  const userId = req.user?.id as string
  if(!userId) throw createError(401, 'Unauthorized !!!')

  // find vendor
  const vendor = await prisma.vendor.findFirst({where: {userId: userId}})
  if(!vendor) throw createError(404, 'vendor not found !!!')

  // create
  const sustainabilityCard = await prisma.sustainabilityCard.create({data: {
    vendorId: vendor.id,
    certifyingAgency: certifyingAgency,
    certificationDate: certificationDate
  }})

  // res
  res.status(201).json(new apiResponse(201, sustainabilityCard))
});
