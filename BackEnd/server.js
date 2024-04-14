import express from 'express'
import dotenv from 'dotenv'
import connect from './db/connectDb.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoute.js'
import cors from 'cors'
const app = express()
dotenv.config({path : 'Env/.env'})
const PORT = process.env.PORT || 3000
connect();

var corsOptions = {
    origin: 'http://localhost:5173/',
    optionsSuccessStatus: 200 
  }




app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors(corsOptions))


app.use("/api/users" , userRoutes)
app.use("/api/posts" , postRoutes)




app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT} `)
})