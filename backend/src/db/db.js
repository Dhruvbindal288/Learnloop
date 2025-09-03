import mongoose from 'mongoose'
import dotenv from'dotenv'
dotenv.config()
const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URL).then
    (()=>{
        console.log('Database connected')
    }).catch((err)=>{ console.log("Database not connected: ",err)})
   
}


export default connectDb