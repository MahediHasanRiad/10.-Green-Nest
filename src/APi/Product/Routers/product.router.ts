import {Router} from 'express'
import { authVerify } from '../../../middleware/auth.middleware.js'
import { CreateProductController } from '../Controller/create-product.controller.js'
import { FindSingleProducts } from '../Controller/find-single-product.controller.js'
import { UpdateProductController } from '../Controller/update-product.controller.js'
import { DeleteProductController } from '../Controller/delete.controller.js'
import { AllProductsByVendorController } from '../Controller/all-products-by-vendor.controller.js'
import { AllProductsController } from '../Controller/all-products.controller.js'

const productRouter = Router()

productRouter.get('/products', authVerify, AllProductsController)
productRouter.post('/product', authVerify, CreateProductController)
productRouter.get('/products/:id', FindSingleProducts)
productRouter.patch('/products/:id', authVerify, UpdateProductController)
productRouter.delete('/products/:id', authVerify, DeleteProductController)
productRouter.get('/vendor-products/:vendorId', authVerify, AllProductsByVendorController)




export {productRouter}