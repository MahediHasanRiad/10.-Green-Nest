import { prisma } from "../../../lib/prisma.js";
import { ApiError } from "../../../Utils/apiError.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { loginType } from "../auth.type.js";
import bcrypt from 'bcrypt'

export const loginController = asyncHandler(async (req, res) => {
  /**
   * get {email, password} = req.body
   * if(empty) return error
   * verify password
   * res
   */

  const { email, password } = req.body as loginType;

  if (!email || !password)
    throw new ApiError(400, "Email & Password are required !!!");

  // find user
  const user = await prisma.user.findFirst({where: {email}})

  // varify password
  const pass = await bcrypt.compare(password, user?.password as string)
  if(!pass) throw new ApiError(400, 'invalid password !!!')

  res.status(200).json(new apiResponse(200, user))
});
