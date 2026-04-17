import { prisma } from "../../../lib/prisma.js";
import createError from 'http-errors'
import bcrypt from 'bcrypt'

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {

    const hash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });
    return user
  } 
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Database connection failed";
    throw createError(500, "Internal Server Error", [message]);
  }
};
