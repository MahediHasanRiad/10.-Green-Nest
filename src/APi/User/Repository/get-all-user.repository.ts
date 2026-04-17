import { prisma } from "../../../lib/prisma.js";
import type { QueryType } from "../user-type.js";

export const GetAllUser = async ({
  page = 1,
  limit = 10,
  sortType = "createdAt",
  sortBy = "desc",
  search = "",
}: QueryType) => {
  const skipPage = (page - 1) * limit;

  const allUsers = await prisma.user.findMany({
    where: {
      name: { contains: search, mode: "insensitive" },
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      [sortType]: sortBy,
    },
    skip: skipPage,
    take: limit,
  });

  return allUsers;
};
