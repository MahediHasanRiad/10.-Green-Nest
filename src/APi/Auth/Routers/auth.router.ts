import {Router} from 'express'
import { registerController } from '../Controller/register.controller.js'

const authRoute = Router()

authRoute.post('/register', registerController)




export {authRoute}