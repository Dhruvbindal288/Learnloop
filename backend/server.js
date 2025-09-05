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

  
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });


  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    
    io.to(receiverId).emit("receiveMessage", { senderId, message });

  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// ✅ start server
const PORT =  3000;
server.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
  connectDb();
});
