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
    friends:[
       { type:mongoose.Schema.Types.ObjectId,
        ref:"Users"}
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