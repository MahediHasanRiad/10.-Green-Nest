import createError from 'http-errors'
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import { FindUser } from "../Repository/find-user.repository.js";

export const findSingleController = asyncHandler(async (req, res) => {
  /**
   * get {id} = req.params
   * if(!id) retur error
   * find user
   * if(!user) return error
   * res
   */
  const id = req.params.id as string;
  if (!id) throw createError(400, "Param id required !!!");

  // find user
  const user = await FindUser(id)

  res.status(200).json(new apiResponse(200, user));
});
