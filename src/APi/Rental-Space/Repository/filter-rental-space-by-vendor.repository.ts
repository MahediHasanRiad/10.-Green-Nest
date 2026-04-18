import { prisma } from "../../../lib/prisma.js";
import type { QueryType } from "../../User/user-type.js";

interface FilterType extends QueryType {
  vendorId: string
}

export const FilterRentalSpaceByVendor = async ({
  page = 1,
  limit = 10,
  sortType = "updatedAt",
  sortBy = "desc",
  search = "",
  vendorId
}: FilterType) => {


  const skipPage = (page - 1) * limit;

  const rentalSpaces = await prisma.rentalSpace.findMany({
    where: { 
      vendorId: vendorId,
      location: { contains: search, mode: "insensitive" }
    },
    orderBy: {
      [sortType]: sortBy,
    },
    skip: skipPage,
    take: Number(limit),
  });

  return rentalSpaces;
};
