import User from "../models/user.model.js";
import Request from "../models/request.model.js";


export const onBoard = async (req, res) => {
  try {
    const userId = req.user._id;
    const { learningSkill, teachingSkill } = req.body;

    if (!learningSkill || !teachingSkill) {
      return res.status(400).json({ message: "At least add one skill in both fields" });
    }

  
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          learningSkill: { $each: learningSkill },
          teachingSkill: { $each: teachingSkill },
        },
        onBoarded:true
      },
      { new: true } 
    ).select("-passoword");

    res.status(200).json({
      message: "Skills updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const sendRequest = async (req, res) => {
  try {
    const senderId = req.user._id; 

    const { id: receiverId } = req.params;

    if (senderId.toString() === receiverId) {
      return res.status(400).json({ message: "You cannot send request to yourself" });
    }

    const receiver = await User.findById(receiverId).select("-password");
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    const request = await Request.create({
      senderId,
      receiverId
    });

    return res.status(201).json({ message: "Request sent successfully" ,request});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const acceptRequest = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { id: requestId } = req.params;

   
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

   
 await Request.findByIdAndUpdate(requestId, { status: "accepted" });

    
    await User.findByIdAndUpdate(request.senderId, {
      $push: { friends: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $push: { friends: request.senderId },
    });

    return res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.error("error in acceptrequest",error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const rejectRequest=async(req,res)=>{
    try {
        const userId=req.user._id;
        const{id:requestId}=req.params;
          const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
 await Request.findByIdAndUpdate(requestId, { status: "rejected" });

 const deleteRequest=await Request.findByIdAndDelete(requestId);
 return res.status(200).json({ message: "Friend request rejected successfully" });

    } catch (error) {
          console.error("error in rejectrequest",error);
    return res.status(500).json({ message: "Server error" });
    }
} 


export const getusers=async()=>{}