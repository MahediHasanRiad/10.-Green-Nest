import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
import { authRoute } from './APi/Auth/Routers/auth.router.js';


const app = express()


// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
dotenv.config({ path: "./.env" });


// routers
app.use('/api/v1', authRoute)



// server connection
app.listen(3000, () => {
  console.log('server is on...')
})