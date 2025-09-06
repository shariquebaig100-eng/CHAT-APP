import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routers/auth.route.js";
import messageRoutes from "./routers/message.route.js";
import { app, server } from "./lib/socket.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

// ✅ Dynamic CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman, curl, etc.
      if (
        origin.startsWith("http://localhost:5173") ||
        origin.startsWith("http://localhost:5174") ||
        origin.startsWith("https://chat-app-phi-ashen-92.vercel.app") ||
        origin.startsWith("https://chat-app-git-main-sharique-baigs-projects.vercel.app") ||
        origin.startsWith("https://chat-7v3i928yn-sharique-baigs-projects.vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running on PORT: ${PORT}`);
  connectDB();
});
