import { prisma } from "../../../lib/prisma.js";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { generateToken } from "../../../Utils/generateAccessToken.js";

export const verifyUser = async (email: string, password: string) => {
  
  const findUser = await prisma.user.findUnique({ where: { email: email } });
  if (!findUser) throw createError(404, "User not found !!!");

  // verify password
  const isValidPassword = await bcrypt.compare(password, findUser.password);
  if (!isValidPassword) throw createError(400, "Invalid Password !!!");

  // find user
  const user = await prisma.user.findUnique({ where: { id: findUser.id } });
  if (!user) throw createError(404, "user not found !!!");

  // generate token
  const accessToken = await generateToken(findUser.id);

  return {
    user,
    accessToken,
  };
};
