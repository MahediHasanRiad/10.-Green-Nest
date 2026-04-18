import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from "http-errors";

export const UpdateProductStatusByVendor = asyncHandler(async (req, res) => {
  /**
   * get {status} = req.body
   * if(!status) return error
   * get id = req.params
   * if(!id) return error
   * find product
   * update status
   * res
   */

  const { certificationStatus } = req.body;
  if (!certificationStatus) createError(400, "status required !!!");

  const productId = req.params.productId as string;
  if (!productId) throw createError(400, "Param id required !!!");

  const userId = req.user?.id as string;
  if (!userId) throw createError(401, "Unauthorized !!!");

  // find product
  const product = await prisma.product.findFirst({ where: { id: productId } });
  if (!product) throw createError(404, "product not found !!!");

  // verify permission
  const vendor = await prisma.vendor.findFirst({ where: { userId: userId } });
  if (product.vendorId !== vendor?.id && req.user?.role !== "ADMIN")
    throw createError(
      403,
      "Does not have permisssion for update Prduct status !!!",
    );

  // update product status
  const update = await prisma.product.update({
    where: { id: productId },
    data: { certificationStatus: certificationStatus },
  });

  // res 
  res.status(200).json(new apiResponse(200, update))
});
