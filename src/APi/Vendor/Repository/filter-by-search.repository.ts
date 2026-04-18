import { prisma } from "../../../lib/prisma.js";
import type { QueryType } from "../../User/user-type.js";

export const FilterBySearch = async ({
  page = 1,
  limit = 10,
  sortType = 'updatedAt',
  sortBy = 'desc',
  search = "",
}: QueryType) => {
  const skipItem = (page - 1) * limit;
  const vendors = await prisma.vendor.findMany({
    where: { user: { name: { contains: search, mode: "insensitive" } } },
    include: { user: { select: { name: true } } },
    orderBy: {
      [sortType]: sortBy,
    },
    skip: skipItem,
    take: limit,
  });

  return vendors
};
