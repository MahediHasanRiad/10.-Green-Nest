import { prisma } from "../../../lib/prisma.js";
import { ApiError } from "../../../Utils/apiError.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../../../Utils/generateAccessToken.js";



export const verifyUser = async (email: string, password: string) => {
  try {
    const findUser = await prisma.user.findUnique({where: {email: email}})

    if (!findUser) throw new ApiError(404, "User not found !!!");
    // verify password
    const isValidPassword = await bcrypt.compare(password, findUser.password)
    console.log(isValidPassword, password, findUser.password)
    if (!isValidPassword) throw new ApiError(400, "Invalid Password !!!");
  
    // find user
    const user = await prisma.user.findUnique({where: {id: findUser.id}})
    if(!user) throw new ApiError(404, 'user not found !!!')
  
    // generate token
    const accessToken = await generateToken(findUser.id);
  
  
    return {
      user,
      accessToken
    }
  } 
  catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Database connection failed";
    throw new ApiError(500, "Internal Server Error", [message]);
  }
};
