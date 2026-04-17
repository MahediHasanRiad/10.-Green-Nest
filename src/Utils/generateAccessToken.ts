import { prisma } from "../lib/prisma.js";
import { ApiError } from "./apiError.js";
import jwt from "jsonwebtoken";

async function generateToken(id: string): Promise<string> {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) throw new ApiError(404, "user not found for generate token !!!");

    // generate token
    const accessToken = jwt.sign(
      {
        id: id,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_DATE as any },
    );

    if (!accessToken)
      throw new ApiError(500, "Failed to generate access token");

    return accessToken;
  } 
  catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }
    const message =
      error instanceof Error ? error.message : "Database connection failed";
    throw new ApiError(500, "Internal Server Error", [message]);
  }
}

export { generateToken };
