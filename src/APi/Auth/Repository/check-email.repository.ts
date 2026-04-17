import { prisma } from "../../../lib/prisma.js";
import createError from 'http-errors'

export const ExistEmail = async (email: string) => {
    const existUser = await prisma.user.findUnique({ where: { email } });
    console.log(email, existUser);
    if (existUser)
      throw createError(400, "Already exist user !!!");

    return existUser;
};
