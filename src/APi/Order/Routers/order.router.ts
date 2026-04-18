import {Router} from 'express'
import { authVerify } from '../../../middleware/auth.middleware.js'
import { CreateOrderController } from '../Controller/create-order.controller.js'
import { FindSingleOrderController } from '../Controller/find-single-order.controller.js'
import { AllOrderByUserController } from '../Controller/all-order-by-user.controller.js'
import { AllOrderByVendorController } from '../Controller/all-order-by-vendor.controller.js'
import { UpdateProductStatusByVendor } from '../Controller/update-product-status-by-vendor.controller.js'
import { CancelOrderController } from '../Controller/cancel-order-by-user.controller.js'

const orderRouter = Router()

orderRouter.post('/product-order', authVerify, CreateOrderController)
orderRouter.get('/product-orders/:orderId', authVerify, FindSingleOrderController)
orderRouter.get('/products-order-list-by-user', authVerify, AllOrderByUserController)
orderRouter.get('/products-order-list-by-vendor', authVerify, AllOrderByVendorController)
orderRouter.patch('/update-product-status-by-vendor/:productId', authVerify, UpdateProductStatusByVendor)
orderRouter.patch('/cancel-order-by-user/:orderId', authVerify, CancelOrderController)


export {orderRouter}