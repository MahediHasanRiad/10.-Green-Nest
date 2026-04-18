import { prisma } from "../../../lib/prisma.js";
import type { QueryType } from "../../User/user-type.js";


export const GetAllProducts = async ({
  page = 1,
  limit = 10,
  sortType = "updatedAt",
  sortBy = "desc",
  search = "",
}: QueryType) => {

  const skipPage = (page - 1) * limit;

  // get all products by vendor based on search
  const getProducts = await prisma.product.findMany({
    where: {
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
