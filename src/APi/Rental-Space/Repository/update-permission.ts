import type { Request } from "express";
import { prisma } from "../../../lib/prisma.js";
import createError from "http-errors";

export const UpdatePermission = async (
  userId: string,
  req: Request,
) => {
  
  const vendor = await prisma.vendor.findFirst({ where: { userId: userId } });
  const product = await prisma.product.findFirst({
    where: { vendorId: vendor?.id! },
  });

  if (product?.vendorId !== vendor?.id && req.user?.role !== "ADMIN")
    throw createError(
      403,
      "Does not have permission !!!",
    );
};
