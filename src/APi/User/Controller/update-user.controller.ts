import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from "http-errors";

export const UpdateUserController = asyncHandler(async (req, res) => {
  /**
   * get {name} = req.body
   * get {id} = req.user
   * if(!id) retur error
   * update
   * res
   */

  const { name } = req.body;

  // get user
  const id = req.user?.id;
  if (!id) throw createError(401, "Unauthorized !!!");

  // update
  const user = await prisma.user.update({
    where: { id },
    data: { name: name },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true
    }
  });

  res.status(200).json(new apiResponse(200, user))
});
