import { prisma } from "../../../lib/prisma.js";
import type { QueryType } from "../../User/user-type.js";

interface FilterType extends QueryType {
  userId: string
}

export const FilterRentalSpaceByUser = async ({
  page = 1,
  limit = 10,
  sortType = "updatedAt",
  sortBy = "desc",
  search = "",
  userId
}: FilterType) => {


  const skipPage = (page - 1) * limit;

  const rentalSpaces = await prisma.rentalSpace.findMany({
    where: { 
      vendor: {
        userId: userId
      },
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
