import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
const protectRoute=async(req,res,next)=>{
try {
    const token=req.cookies.token;
    if(!token) return res.status(400).json({message:"You are not Autharized..."});
const decoded = jwt.verify(token, process.env.JWT_SECRET);
 const user = await User.findById(decoded.id).select("-password");
  req.user = user;
   next();
} catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
}
}
export default protectRoute;