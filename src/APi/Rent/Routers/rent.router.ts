import {Router} from 'express'
import { authVerify } from '../../../middleware/auth.middleware.js'
import { CreateRentalSpaceController } from '../Controller/create-rental-space.controller.js'
import { FindSingleBookedSpace } from '../Controller/find-single-booked-space.controller.js'
import { AllBookedSpaceByUser } from '../Controller/all-booked-space-by-user.controller.js'
import { AllBookedSpaceByVendor } from '../Controller/all-booked-space-by-vendor.controller.js'
import { UpdateRentalSpaceStatus } from '../Controller/rental-space-status-by-vendor.controller.js'
import { CancelBookingController } from '../Controller/cancel-booking.controller.js'

const rentRouter = Router()

rentRouter.post('/rental-space/booking', authVerify, CreateRentalSpaceController)
rentRouter.get('/booked-spaces/:bookingId', authVerify, FindSingleBookedSpace)
rentRouter.get('/all-booked-spaces-by-user', authVerify, AllBookedSpaceByUser)
rentRouter.get('/all-booked-spaces-by-vendor/:vendorId', authVerify, AllBookedSpaceByVendor)
rentRouter.patch('/rental-space-status-by-vendor/:rentalSpaceId', authVerify, UpdateRentalSpaceStatus)
rentRouter.patch('/cancel-booking/:bookedId', authVerify, CancelBookingController)




export {rentRouter}