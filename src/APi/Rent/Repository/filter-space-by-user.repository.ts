import { prisma } from "../../../lib/prisma.js";
import type { QueryType } from "../../User/user-type.js";

interface FilterType extends QueryType {
  vendorId: string
}

export const FilterBookedSpace = async ({
  page = 1,
  limit = 10,
  sortType = 'updatedAt',
  sortBy = 'desc',
  search = '',
  vendorId,
}: FilterType) => {

  const skipPage = (page - 1) * limit;
  
  const filterSpaces = await prisma.rent.findMany({
    where: {
      vendorId: vendorId,
      rentalSpace: { location: { contains: search, mode: "insensitive" } },
    },
    include: {
      user: { select: { name: true } },
      rentalSpace: { select: { location: true, size: true, price: true } },
      vendor: { select: { user: { select: { name: true } } } },
    },
    orderBy: {
      [sortType]: sortBy,
    },
    skip: skipPage,
    take: Number(limit),
  });

  return filterSpaces
};
