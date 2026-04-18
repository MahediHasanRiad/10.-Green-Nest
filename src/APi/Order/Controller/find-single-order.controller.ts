import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from "http-errors";

export const FindSingleOrderController = asyncHandler(async (req, res) => {
  const id = req.params.orderId as string;
  if (!id) throw createError(400, "Param id required !!!");

  // find order details
  const orderProduct = await prisma.order.findFirst({
    where: { id },
    include: {
      product: { select: { name: true, category: true, price: true } },
    },
  });

  // add links
  const links = {
    self: `/product-orders/${id}`,
    customerLink: `/users/${orderProduct?.userId}`,
    productLink: `/products/${orderProduct?.productId}`,
    vendorLink: `/vendors/${orderProduct?.vendorId}`
  }

  // res
  res.status(200).json(new apiResponse(200, {orderProduct, links}))
});
