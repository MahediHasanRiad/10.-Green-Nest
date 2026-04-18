import { prisma } from "../../../lib/prisma.js";
import type { QueryType } from "../../User/user-type.js";

export const FilterRentalSpace = async ({
  page = 1,
  limit = 10,
  sortType = "updatedAt",
  sortBy = "desc",
  search = "",
}: QueryType) => {

  const skipPage = (page - 1) * limit;
  
  const rentalSpaces = await prisma.rentalSpace.findMany({
    where: { location: { contains: search, mode: "insensitive" } },
    orderBy: {
      [sortType]: sortBy,
    },
    skip: skipPage,
    take: Number(limit),
  });

  return rentalSpaces;
};
