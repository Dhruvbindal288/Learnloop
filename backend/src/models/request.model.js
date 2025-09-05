import mongoose from 'mongoose'

const requestSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","accepted","rejected"]
    }
},{timestamps:true})

const Request= mongoose.model("request",requestSchema)

export default Request