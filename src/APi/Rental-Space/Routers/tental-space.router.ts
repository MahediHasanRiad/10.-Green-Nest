import {Router} from 'express'
import { authVerify } from '../../../middleware/auth.middleware.js'
import { CreateRentalSpaceController } from '../Controller/create-rental-space.controller.js'
import { FindSingleRentalSpaceController } from '../Controller/find-single-rental-space.controller.js'
import { UpdateRentalSpaceController } from '../Controller/update-rental-space.controller.js'
import { DeleteRentalSpacesController } from '../Controller/delete-rental-space.controller.js'
import { AllRentalSpaceController } from '../Repository/all-rental-space.js'
import { AllRentalSpacesByVendor } from '../Controller/rental-spaces-by-vendor.controller.js'
import { AllRentalSpaceByUser } from '../Controller/rental-space-by-user.controller.js'

const rentalSpaceRoute = Router()


rentalSpaceRoute.get('/all-rental-spaces', authVerify, AllRentalSpaceController)
rentalSpaceRoute.get('/rental-spaces-by-vendor/:vendorId', authVerify, AllRentalSpacesByVendor)
rentalSpaceRoute.get('/rental-spaces-by-user', authVerify, AllRentalSpaceByUser)
rentalSpaceRoute.post('/rental-space', authVerify, CreateRentalSpaceController)
rentalSpaceRoute.get('/rental-spaces/:rentalSpaceId', FindSingleRentalSpaceController)
rentalSpaceRoute.patch('/rental-spaces/:rentalSpaceId', authVerify, UpdateRentalSpaceController)
rentalSpaceRoute.delete('/rental-spaces/:rentalSpaceId', authVerify, DeleteRentalSpacesController)





export {rentalSpaceRoute}