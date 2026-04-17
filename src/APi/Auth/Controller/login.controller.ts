import { prisma } from "../../../lib/prisma.js";
import { ApiError } from "../../../Utils/apiError.js";
import { apiResponse } from "../../../Utils/apiResponse.js";
import { asyncHandler } from "../../../Utils/asyncHandler.js";
import { generateToken } from "../../../Utils/generateAccessToken.js";
import type { loginType } from "../auth.type.js";
import bcrypt from "bcrypt";
import { verifyUser } from "../Utils/user.js";

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
