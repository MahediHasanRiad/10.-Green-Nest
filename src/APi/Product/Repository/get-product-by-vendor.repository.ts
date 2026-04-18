import { prisma } from "../../../lib/prisma.js";
import createError from "http-errors";
import type { QueryType } from "../../User/user-type.js";

interface ProductType extends QueryType {
  vendorId: string;
}

export const GetProductByVendor = async ({
  page = 1,
  limit = 10,
  vendorId,
  sortType = "updatedAt",
  sortBy = "desc",
  search = "",
}: ProductType) => {

  const skipPage = (page - 1) * limit;

  const vendor = await prisma.vendor.findFirst({ where: { id: vendorId } });
  if (!vendor) throw createError(404, "vendor not found !!!");

  // get all products by vendor based on search
  const getProducts = await prisma.product.findMany({
    where: {
      vendorId: vendor.id,
      name: { contains: search, mode: "insensitive" },
    },
    orderBy: {
      [sortType]: sortBy,
    },
    skip: skipPage,
    take: Number(limit),
  });

  return getProducts;
};
