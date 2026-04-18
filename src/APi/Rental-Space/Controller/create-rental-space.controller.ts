import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { RentalInputType } from "../rental-space-type.js";
import createError from "http-errors";
import { RentalInput } from "../Validation/rental-input.validation.js";
import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";

export const CreateRentalSpaceController = asyncHandler(async (req, res) => {
  /**
   * get {vendorId, location,size, price, availability } = req.body
   * if(empty) return error
   * find vendor
   * if (!exist) return error
   * verify persion to create
   * create
   * res
   */

  const { location, size, price, availability } = req.body as RentalInputType;

  // input validation
  RentalInput({ location, size, price, availability });

  const userId = req.user?.id as string;
  if (!userId) throw createError(401, "Unauthorized !!!");

  const vendor = await prisma.vendor.findFirst({ where: { userId: userId } });
  if (!vendor) throw createError(404, "vendor not found !!!");

  // verify persion
  if (req.user?.role !== "VENDOR" && req.user?.role !== "ADMIN")
    throw createError(
      403,
      "Does not have permission to create a rental space section",
    );

  // create
  const rentalSpace = await prisma.rentalSpace.create({data: {
    vendorId: vendor.id,
    location,
    size,
    price,
    availability
  }})


  // res
  res.status(201).json(new apiResponse(201, rentalSpace))
});
