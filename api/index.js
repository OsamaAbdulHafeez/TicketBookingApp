import express from 'express'
import dotenv from 'dotenv'
import { dbConnection } from './utils/dbConnection.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import roomRouter from './routes/room.js'
import hotelRouter from './routes/hotel.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
const app = express()
dotenv.config()
dbConnection()
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/room",roomRouter)
app.use("/api/hotel",hotelRouter)
// const corsOptions ={
//     origin:'http://localhost:8000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(cors());
app.use((err,req,res,next)=>{
    const errStatus = err.status || 500
    const errMessage = err.message || "Some thing went wrong"
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMessage,
        stack:err.stack
    })
})
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("Connected to backend"+PORT)
})