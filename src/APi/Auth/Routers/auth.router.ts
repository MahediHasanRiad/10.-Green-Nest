import {Router} from 'express'
import { registerController } from '../Controller/register.controller.js'
import { loginController } from '../Controller/login.controller.js'

const authRoute = Router()

authRoute.post('/register', registerController)
authRoute.post('/login', loginController)




export {authRoute}