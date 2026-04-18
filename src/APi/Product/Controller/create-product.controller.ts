import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { ProductType } from "../product-type.js";
import createError from "http-errors";
import { CreateInputValidation } from "../Validation/create-input.validation.js";
import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";

export const CreateProductController = asyncHandler(async (req, res) => {
  /**
   * get {name,description,price,category,availableQuantity,sustainabilityCardId} = req.body
   * if(empty) return error
   * get userId = req.user.id
   * if(!userId) throw error
   * verify user role for create
   * create
   * res
   */

  const {
    name,
    description,
    price,
    category,
    availableQuantity,
    sustainabilityCardId,
  } = req.body as ProductType;

  // input validation
  await CreateInputValidation({
    name,
    description,
    price,
    category,
    availableQuantity,
    sustainabilityCardId,
  });

  // user
  const userId = req.user?.id as string;
  if (!userId) throw createError(401, "Unauthorized !!!");

  // find vendor
  const vendor = await prisma.vendor.findFirst({ where: { userId: userId } });
  if (!vendor) throw createError(404, "vendor not found !!!");

  // verify user role for create
  if (req.user?.role !== "VENDOR" && req.user?.role !== "ADMIN")
    throw createError(403, "Does not have persion to create product");

  // create
  const product = await prisma.product.create({
    data: {
      vendorId: vendor.id,
      name,
      description,
      price,
      category,
      availableQuantity,
      sustainabilityCardId: sustainabilityCardId
    },
  });

  // res
  res.status(201).json(new apiResponse(201, product));
});
