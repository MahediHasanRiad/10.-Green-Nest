import { Router } from "express";
import { getAllUserController } from "../Controller/all-users.controller.js";
import { authVerify } from "../../../middleware/auth.middleware.js";
import { findSingleController } from "../Controller/find-single-user.controller.js";
import { UpdateUserController } from "../Controller/update-user.controller.js";
import { DeleteUserController } from "../Controller/delete.controller.js";
import { ChangePasswordController } from "../Controller/change-password.controller.js";

const userRouter = Router()

userRouter.post('/users/reset-password', authVerify, ChangePasswordController)
userRouter.get('/users', authVerify, getAllUserController)
userRouter.get('/users/:id', findSingleController)
userRouter.patch('/users/:id', authVerify, UpdateUserController)
userRouter.delete('/users/:id', authVerify, DeleteUserController)



export {userRouter}