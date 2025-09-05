import User from "../models/user.model.js";
import Request from "../models/request.model.js";


export const onBoard = async (req, res) => {
  try {
    const userId = req.user._id;
    const { learningSkill=[], teachingSkill=[] } = req.body;

    if (!learningSkill.length || !teachingSkill.length) {
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
    ).select("-password");

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

    if (senderId.toString() === receiverId.toString()) {
      return res.status(400).json({ message: "You cannot send request to yourself" });
    }

    const receiver = await User.findById(receiverId).select("-password");
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

   
    const existing = await Request.findOne({ senderId, receiverId, status: "pending" });
    if (existing) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = await Request.create({ senderId, receiverId });

    console.log("New request created:", request);

    return res.status(201).json({ message: "Request sent successfully", request });
  } catch (error) {
    console.error("Error in sendRequest:", error);
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




export const getUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    
    const currentUser = await User.findById(userId).select("friends");

  
    const users = await User.find({
      _id: { $ne: userId, $nin: currentUser.friends }, 
      onBoarded: true,
    }).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;

   
    const user = await User.findById(userId)
      .populate("friends", "fullName email learningSkill teachingSkill") 
      .select("friends");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      friends: user.friends,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const getRequests=async(req,res)=>{
  try {
    const userId=req.user._id;
    const requests=await Request.find({ receiverId: userId ,status: "pending" }).populate("senderId", 'fullName teachingSkill learningSkill');
    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Server error" });
  }
}