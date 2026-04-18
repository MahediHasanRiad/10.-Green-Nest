import { Router } from "express";
import { authVerify } from "../../../middleware/auth.middleware.js";
import { CreateSustainabilityController } from "../Controller/create-sustainability.controller.js";

const sustainabilityRouter = Router()

sustainabilityRouter.post('/sustainability', authVerify, CreateSustainabilityController)


export {sustainabilityRouter}