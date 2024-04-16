import express from 'express'
import dotenv from 'dotenv'
import connect from './db/connectDb.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoute.js'
import cors from 'cors'
import {v2} from 'cloudinary'

const app = express()
dotenv.config({path : 'Env/.env'})
const PORT = process.env.PORT || 3000
connect();

let corsOptions = {
    origin: 'http://localhost:5173/',
    optionsSuccessStatus: 200 
  }

v2.config({

  cloud_name : process.env.CLOUDNARY_CLOUD_NAME,
  api_key : process.env.CLOUDNARY_API_KEY,
  api_secret : process.env.CLOUDNARY_API_SECRET

})  




app.use(express.json({
  limit : '1mb'
}))
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors(corsOptions))


app.use("/api/users" , userRoutes)
app.use("/api/posts" , postRoutes)




app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT} `)
})