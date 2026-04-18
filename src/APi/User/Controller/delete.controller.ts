import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import createError from 'http-errors'

export const DeleteUserController = asyncHandler(async (req, res) => {

  // param id
  const id = req.params.id as string
  if(!id) throw createError(400, 'Param id not found !!!')
  
  // user id from token
  const userId = req.user?.id
  if(!userId) throw createError(401, "Unauthorized !!!")

  // verify
  if(userId !== id || req.user?.role !== 'Admin') throw createError(403, 'Unauthorized !!!')

  // delete
  const user = await prisma.user.delete({where: {id}})
  if(!user) throw createError(404, 'user not found !!!')

  res.status(204).json(new apiResponse(204, '', 'successfully deleted !!!'))
})