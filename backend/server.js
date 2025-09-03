import express from 'express'
import connectDb from './src/db/db.js'
import authRouter from './src/routes/user.auth.route.js'
import cookieparser from 'cookie-parser'
import dotenv from 'dotenv'

const app=express()



dotenv.config()

app.use(express.json());
app.use(cookieparser())
app.use('/api/auth',authRouter)


app.listen(3000,()=>{
    console.log("Server Started")
    connectDb()
})