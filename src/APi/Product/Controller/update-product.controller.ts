import { prisma } from "../../../lib/prisma.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { ProductType } from "../product-type.js";
import createError from "http-errors";
import { UpdatedItems } from "../Validation/updated-item.validation.js";
import { apiResponse } from "../../../Utils/apiResponse.js";

export const UpdateProductController = asyncHandler(async (req, res) => {
  /**
   * get {name, description, price, category, availableQuantity, sustainabilityCardId } = req.body
   * get id = req.params.id
   * if(!id) return error
   * get userId = req.user.id
   * if(!userId) return error
   * verity user role for update
   * update
   * res
   */

  const {
    name,
    description,
    price,
    category,
    availableQuantity,
    sustainabilityCardId,
  } = req.body as Partial<ProductType>;

  const productId = req.params.id as string;
  if (!productId) throw createError(400, "Param Id required !!!");

  const userId = req.user?.id as string;
  if (!userId) throw createError(401, "Unauthorized !!!");

  // find vendor
  const vendor = await prisma.vendor.findFirst({ where: { userId: userId } });
  if (!vendor) throw createError(404, "vendor not found !!!");

  // verify role for update
  if (vendor.userId !== userId && req.user?.role !== "ADMIN")
    throw createError(
      403,
      "Does not have permission to update product item !!!",
    );

  // updated value
  const updated = await UpdatedItems({
    name,
    description,
    price,
    category,
    availableQuantity,
    sustainabilityCardId,
  });

  // update
  const product = await prisma.product.update({where: {id: productId}, data: updated})

  // res
  res.status(200).json(new apiResponse(200, product))

});
