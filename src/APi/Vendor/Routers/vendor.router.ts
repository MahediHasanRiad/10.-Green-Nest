import {Router} from 'express'
import { authVerify } from '../../../middleware/auth.middleware.js'
import { CreateVendorController } from '../Controller/create-vendor.controller.js'
import { FindSingleVendorController } from '../Controller/find-single-vendor.controller.js'
import { UpdateVendorProfileController } from '../Controller/update-vendor.controller.js'
import { DeleteVendorController } from '../Controller/delete-vendor.controller.js'
import { getAllVendorsController } from '../Controller/get-all-vendors.controller.js'

const vendorRouter = Router()

vendorRouter.get('/vendors', authVerify, getAllVendorsController)
vendorRouter.post('/vendor', authVerify, CreateVendorController)
vendorRouter.get('/vendors/:id', FindSingleVendorController)
vendorRouter.patch('/vendors/:id', authVerify, UpdateVendorProfileController)
vendorRouter.delete('/vendors/:id', authVerify, DeleteVendorController)


export {vendorRouter}