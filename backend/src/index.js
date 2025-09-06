import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import path from "path"


import authRoutes from './routers/auth.route.js';
import messageRoutes from './routers/message.route.js';
import { app, server } from './lib/socket.js';

import { connectDB } from './lib/db.js';

dotenv.config()




const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

app.use(cookieParser());
const allowedOrigin =[
  "http://localhost:5173","http://localhost:5174","https://chatapp-94r325gqd-sharique-baigs-projects.vercel.app"
]

app.use(express.json());//this wil allow to use json data out of the body
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")))


//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   })
// }
app.get("/",(req,res)=>{
  res.send("Backend is running...")
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
  connectDB();
});