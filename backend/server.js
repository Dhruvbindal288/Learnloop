import express from 'express'
import connectDb from './src/db/db.js'
import authRouter from './src/routes/user.auth.route.js'
import userRouter from './src/routes/user.request.route.js'
import cookieparser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
const app=express()



dotenv.config()

 app.use(cors({
origin:'http://localhost:5173',
    credentials:true
 }))
app.use(express.json());
app.use(cookieparser())
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


app.listen(3000,()=>{
    console.log("Server Started")
    connectDb()
})