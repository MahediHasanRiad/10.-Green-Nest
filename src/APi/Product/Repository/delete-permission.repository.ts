import type { Request } from "express";
import { prisma } from "../../../lib/prisma.js";
import createError from "http-errors";

export const VerifyPermission = async (req: Request, userId: string) => {
  
  // find vendor
  const vendor = await prisma.vendor.findFirst({ where: { userId: userId } });

  // find vendor from product
  const findVendor = await prisma.product.findFirst({
    where: { vendorId: vendor?.id! },
  });

  // verity permission for delete
  if (findVendor?.vendorId !== vendor?.id && req.user?.role !== "ADMIN")
    throw createError(
      403,
      "Does not have permission to delete product item !!!",
    );
}