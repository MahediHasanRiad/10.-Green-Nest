import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from "http-errors";
import { VerifyPermission } from "../Repository/delete-permission.repository.js";

export const DeleteProductController = asyncHandler(async (req, res) => {
  
  const id = req.params.id as string;
  if (!id) throw createError(400, "Param id required !!!");

  const userId = req.user?.id as string;
  if (!userId) throw createError(401, "Unauthorized !!!");

  // find product
  const product = await prisma.product.findFirst({where: {id}})
  if(!product) throw createError(404, 'Product not found !!!')

  // verify permission
  await VerifyPermission(req, userId)

  // delete
  await prisma.product.delete({where: {id}})

  res.status(204).json(new apiResponse(204, null, 'successfully deleted !!!'))
});
