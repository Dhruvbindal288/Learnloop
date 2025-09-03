import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String
    },
    friends:[
       { type:mongoose.Schema.Types.ObjectId,
        ref:"User"}
    ],
onBoarded:{
    type:Boolean,
    default:false
},
learningSkill:[
    {
        type:String
    }],

    teachingSkill:[
    {
        type:String
    }
]

   
}, {timestamps:true});

const User=mongoose.model('User',userSchema)

export default User;