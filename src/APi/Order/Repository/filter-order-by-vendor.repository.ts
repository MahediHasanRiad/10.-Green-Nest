import { prisma } from "../../../lib/prisma.js";
import type { QueryType } from "../../User/user-type.js";

interface InputType extends QueryType {
  vendorId: string
}

export const FilterOrderByVendor = async ({
  page = 1,
  limit = 10,
  sortType = 'updatedAt',
  sortBy = 'desc',
  search = '',
  vendorId,
}: InputType) => {

  const skipPage = (page - 1) * limit;

  const filterOrder = await prisma.order.findMany({
    where: {
      vendorId: vendorId,
      product: { name: { contains: search, mode: "insensitive" } },
    },
    include: {
      user: { select: { name: true } },
      product: { select: { name: true, price: true, category: true } },
      vendor: { select: { id: true, userId: true, user: { select: { name: true, }, },},},
    },
    orderBy: {
      [sortType]: sortBy,
    },
    skip: skipPage,
    take: limit,
  });

  return filterOrder
};
