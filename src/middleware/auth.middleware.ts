import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../Utils/asyncHandler.js";
import createError from 'http-errors'
import { prisma } from "../lib/prisma.js";
import jwt from 'jsonwebtoken'
import type { decodedType, UserType } from "../APi/User/user-type.js";


const authVerify = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw createError(400, "Invalid Token !!!");

  // decoded from token
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY as string ) as decodedType;


  let user = await prisma.user.findUnique({where: {id: decoded?.id}})
  if (!user) throw createError(404, "Invalid Token !!!");
  
  req.user = user as UserType;

  next();
});

export { authVerify };
