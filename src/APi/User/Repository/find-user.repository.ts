import createError from "http-errors";
import { prisma } from "../../../lib/prisma.js";

export const FindUser = async (id: string) => {
    const user = await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw createError(400, "user not found !!!");
  
    return user;
};
