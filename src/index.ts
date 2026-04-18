import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
import { authRoute } from './APi/Auth/Routers/auth.router.js';
import { userRouter } from './APi/User/Routers/user.router.js';
import { globalErrorHandler } from './Utils/global-error-handler.js';
import { vendorRouter } from './APi/Vendor/Routers/vendor.router.js';
import { productRouter } from './APi/Product/Routers/product.router.js';
import { sustainabilityRouter } from './APi/Sustainability/Routers/sustainability.router.js';
import { rentalSpaceRoute } from './APi/Rental-Space/Routers/tental-space.router.js';


const app = express()


// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
dotenv.config({ path: "./.env" });


// routers
app.use('/api/v1', authRoute)
app.use('/api/v1', userRouter)
app.use('/api/v1', vendorRouter)
app.use('/api/v1', productRouter)
app.use('/api/v1', rentalSpaceRoute)
app.use('/api/v1', sustainabilityRouter)







// error handler
app.use(globalErrorHandler);

// server connection
app.listen(3000, () => {
  console.log('server is on...')
})