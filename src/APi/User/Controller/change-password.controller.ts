import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { ChangePassType } from "../user-type.js";
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import { prisma } from "../../../lib/prisma.js";
import { apiResponse } from "../../../Utils/apiResponse.js";


export const ChangePasswordController = asyncHandler(async (req, res) => {
  /**
   * get {oldPassword, newPassword} = req.body
   * if(empty) return error
   * verify oldPassword
   * if (false) return error
   * hash pass
   * reset
   * res
   */

  const { oldPassword, newPassword }: ChangePassType = req.body
  const id = req.user?.id

  if(!id) throw createError(400, 'invalid token !!!')
  if(!oldPassword || !newPassword) throw createError(400, 'old password & new password both are required !!!')

  // find user
  const user = await prisma.user.findFirst({where: {id}})
  if(!user) throw createError(404, 'user not found !!!')

  // verify password
  const pass = await bcrypt.compare(oldPassword, user.password)
  if(!pass) throw createError(400, 'invalid password !!!')

  // hash password
  const hashPass = await bcrypt.hash(newPassword, 10)

  // update password
  const updatePassword = await prisma.user.update({where: {id}, data: {password: hashPass}})
  
  res.status(200).json(new apiResponse(200, updatePassword))

})