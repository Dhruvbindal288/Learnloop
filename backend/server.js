import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDb from "./src/db/db.js";
import authRouter from "./src/routes/user.auth.route.js";
import userRouter from "./src/routes/user.request.route.js";
import messageRouter from "./src/routes/message.route.js";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import Message from "./src/models/message.model.js"; // ✅ import your Message model
import User from "./src/models/user.model.js"; // optional, for validation

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());

// ✅ routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/messages", messageRouter);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // join personal room
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  // ✅ send message handler
  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    try {
      if (!message?.trim()) return;

      // 1️⃣ Save to DB
      const newMessage = await Message.create({
        senderId,
        receiverId,
        message,
      });

      // 2️⃣ Emit to receiver room
      io.to(receiverId).emit("receiveMessage", newMessage);

      // 3️⃣ Optionally emit back to sender (so their UI syncs)
      io.to(senderId).emit("receiveMessage", newMessage);

      console.log("Message saved & sent:", newMessage);
    } catch (error) {
      console.error("❌ Error sending message:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// ✅ start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
  connectDb();
});
