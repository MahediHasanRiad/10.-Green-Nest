import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import type { loginType } from "../auth.type.js";
import { verifyUser } from "../Utils/user.js";
import createError from 'http-errors'

export const loginController = asyncHandler(async (req, res) => {
  /**
   * get {email, password} = req.body
   * if(empty) return error
   * verify password
   * res
   */

  const { email, password } = req.body as loginType;

  if (!email || !password)
    throw createError(400, "Email & Password are required !!!");

  // verify user
  const { user, accessToken } = await verifyUser(email, password);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new apiResponse(200, user));
});
