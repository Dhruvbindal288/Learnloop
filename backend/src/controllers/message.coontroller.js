import Message from "../models/message.model";
export const sendMessage=async(req,res)=>{
    try {
          const senderId = req.user._id;
    const { receiverId } = req.params;
    const { message } = req.body;
   if (!message) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }
     const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
     res.status(201).json(newMessage);
    } catch (error) {
         console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
    }
}
export const getMessages=async(req,res)=>{
    try {
          const senderId = req.user._id;
    const { receiverId } = req.params;
const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });
     res.status(200).json(messages);
    } catch (error) {
            console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
    }
}