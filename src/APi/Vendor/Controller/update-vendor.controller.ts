import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { InputValueType } from "../vendor-type.js";
import createError from "http-errors";

export const UpdateVendorProfileController = asyncHandler(async (req, res) => {
  /**
   * get {farmName, farmLocation} = req.body
   * get id = req.param.id
   * if(!id) throw error
   * find vendor by param id
   * verify vendor id with token id
   * update
   * res
   */

  const { farmName, farmLocation } = req.body as Partial<InputValueType>;

  const userId = req.user?.id as string;
  if (!userId) throw createError(401, "unauthorized !!!");

  const id = req.params.id as string;
  if (!id) throw createError(400, "Param Id required !!!");

  // find vendor profile
  const findVendor = await prisma.vendor.findFirst({where: {id}})

  // verify vendor for update
  if (userId !== findVendor?.userId && req.user?.role !== "Admin")
    throw createError(403, "Does not have permission !!!");

  // update
  const updated: Partial<InputValueType> = {};

  if (farmName) updated.farmName = farmName;
  if (farmLocation) updated.farmLocation = farmLocation;

  const vendorProfile = await prisma.vendor.update({
    where: { id },
    data: updated,
  });

  // res
  res.status(200).json(new apiResponse(200, vendorProfile))
});
