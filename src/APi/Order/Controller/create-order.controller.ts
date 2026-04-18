import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from "http-errors";

interface Inputtype {
  productId: string;
  quantity: number;
}

export const CreateOrderController = asyncHandler(async (req, res) => {
  /**
   * get {produceId} = req.body
   * if(!product) throw error
   * get userId = req.user.id
   * if(!userId) throw error
   * find vendor using productId
   * create order
   * reduce product quentity
   * res
   */

  const { productId, quantity } = req.body as Inputtype
  if (!productId) throw createError(400, "select a product !!!");

  const userId = req.user?.id as string;
  if (!userId) throw createError(401, "Unauthorized !!!");

  // find vendor using product id
  const product = await prisma.product.findFirst({ where: { id: productId } });
  if (!product) throw createError(404, "Product not found !!!");

  // vendor
  const vendor = await prisma.vendor.findFirst({
    where: { id: product.vendorId },
  });
  if (!vendor) throw createError(404, "vendor not found !!!");

  // create an order
  const order = await prisma.order.create({
    data: {
      userId: userId,
      productId: productId,
      vendorId: vendor.id,
      quantity: quantity
    },
  });

  // reduce product item
  const reduceQuantity = await prisma.product.update({
    where: { id: productId },
    data: { availableQuantity: {decrement: quantity} },
  });
  if(!reduceQuantity) throw createError(500, 'something went wrong duright reduce quantity !!!')

  // res
  res.status(201).json(new apiResponse(201, order))
});
