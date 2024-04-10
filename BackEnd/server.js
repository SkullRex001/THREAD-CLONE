import express from 'express'
import dotenv from 'dotenv'
import connect from './db/connectDb.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'

const app = express()
dotenv.config({path : 'Env/.env'})
const PORT = process.env.PORT || 3000
connect();




app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())



app.use("/api/users" , userRoutes)








app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT} `)
})