import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from "http-errors";

export const CancelOrderController = asyncHandler(async (req, res) => {
  /**
   * get orderId = req.params
   * if(!order) return error
   * find order
   * if(!exist) retur error
   * update order status
   * res
   */
  const orderId = req.params.orderId as string;
  if (!orderId) throw createError(400, "Param Id required !!!");

  const userId = req.user?.id as string;
  if (!userId) throw createError(401, "Unauthorized !!!");

  // find order
  const findOrder = await prisma.order.findFirst({ where: { id: orderId } });
  if (!findOrder) throw createError(404, "order not found !!!");

  // verify permission
  if (userId !== findOrder.userId && req.user?.role !== "ADMIN")
    throw createError(403, "Does not have permissoin to cancel order !!!");

  // update order status
  const updated = await prisma.order.update({
    where: { id: orderId },
    include: {product: {select: {name: true, price: true, category: true}}},
    data: { status: "CANCELLED" },
  });

  // add links
  const links = {
    self: `/orders/${orderId}`,
    ProductLink: `/products/${updated.productId}`,
    CustomerLink: `/users/${updated.userId}`,
    VendorLink: `/vendors/${updated.vendorId}`
  }

  // res
  res.status(200).json(new apiResponse(200, {updated, links}))
});
