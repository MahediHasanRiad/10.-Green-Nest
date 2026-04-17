import { prisma } from "../../../lib/prisma.js";
import { ApiError } from "../../../Utils/apiError.js";

export const ExistEmail = async (email: string) => {
  try {
    const existUser = await prisma.user.findUnique({ where: { email } });
    console.log(email, existUser);
    if (existUser)
      throw new ApiError(400, "Already exist user !!!");

    return existUser;
  } 
  catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Database connection failed";
    throw new ApiError(500, "Internal Server Error", [message]);
  }
};
