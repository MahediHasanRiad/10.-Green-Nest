import { prisma } from "../lib/prisma.js";
import createError from 'http-errors'
import jwt from "jsonwebtoken";

async function generateToken(id: string): Promise<string> {

    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) throw createError(404, "user not found for generate token !!!");

    // generate token
    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_DATE as any },
    );

    if (!accessToken)
      throw createError(500, "Failed to generate access token");

    return accessToken;
}

export { generateToken };
