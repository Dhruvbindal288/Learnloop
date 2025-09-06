import User from '../models/user.model.js'
import bcrypt from'bcrypt'
import jwt from 'jsonwebtoken'

export const signup=async(req,res)=>{
    try{
        const {fullName,email,password}=req.body;
if(!fullName||!email||!password) res.status(400).json({message:"All fields are mandatory"});
if(password.length<6)return res.status(400).json({message:"password must be more than 6 character"})
       
    const existingUser=await User.findOne({email})
        
if(existingUser) return res.status(400).json({message:"User already exist"});
const hashedPassword=await bcrypt.hash(password,12);
const user=await User.create({
fullName,email,password:hashedPassword
    })  
 const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:1000*60*60*24*7})
 
 res.cookie("token", token, {
  httpOnly: true,     
  secure: false,        
  sameSite: "strict",  
  maxAge: 1000 * 60 * 60 * 24 * 7 
});

    res.status(201).json({message:"SignUp successfully",user:{
        id:user._id, fullName:user.fullName,email:user.email
    }});
    }
catch(err){
    console.log("Error in signup: ",err.message)
    res.status(400).json({message:"Server error"})
}
}
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password) res.status(400).json({message:"All fields are mandatory"});
         const user=await User.findOne({email})
if(!user) return res.status(404).json({message:"User does not exist"});
const matchPassword=await bcrypt.compare(password,user.password)
if(!matchPassword) return res.status(400).json({message:"Incorrect password"})

 const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:1000*60*60*24*7});

  res.cookie("token", token, {
  httpOnly: true,     
  secure: false,        
  sameSite: "strict",  
  maxAge: 1000 * 60 * 60 * 24 * 7 
});
res.status(200).json({message:"Login successfully",user:{
        id:user._id, fullName:user.fullName,email:user.email
    }});
    
} catch (error) {
          console.log("Error in login: ",err.message)
    res.status(400).json({message:"Server error"})
    }
}
export const logout=async(req,res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({message:"Logout successfully"});
    } catch (error) {
         console.log("Error in logout: ",err.message)
    res.status(400).json({message:"Server error"})
    
    }
}

export const me = async (req, res) => {
  try {
    if (!req.user) {
     
      return res.status(200).json({ user: null });
    }

    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in me: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
