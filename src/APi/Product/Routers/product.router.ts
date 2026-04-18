import {Router} from 'express'
import { authVerify } from '../../../middleware/auth.middleware.js'

const productRouter = Router()

productRouter.post('/product', authVerify, )




export {productRouter}