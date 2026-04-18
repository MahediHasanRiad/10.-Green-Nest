import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import { Pagination } from "../../../Utils/pagination.js";
import { GetAllUser } from "../Repository/get-all-user.repository.js";
import type { QueryType } from "../user-type.js";
import createError from 'http-errors'

export const getAllUserController = asyncHandler(async (req, res) => {
  /**
   * get {page, limit, sortBy, sortType, search} = req.query
   * get user = req.user
   * if(!user) unauthorrized
   * get all user
   * add pagination and links
   * res
   */

  let {
    page = 1,
    limit = 10,
    sortBy = "desc",
    sortType = "updatedAt",
    search = "",
  } = req.query as QueryType;
  page = Number(page || 1);
  limit = Number(limit || 10);

  const id = req.user?.id;
  if (!id) throw createError(401, "Unauthorized !!!");

  // filter all user
  const filterUser = await GetAllUser({page, limit, sortBy, sortType, search})

  // add link
  const users = filterUser.map(user => ({
    ...user,
    links: {
      self: `/users/${user.id}`
    }
  }))

  // pagination
  const totalUser = await prisma.user.count({
    where: { name: { contains: search, mode: "insensitive" } },
  });
  const pagination = Pagination(page, limit, totalUser, 'users')
  

  res.status(200).json(new apiResponse(200, {users, pagination}))
});
