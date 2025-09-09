import express from "express";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routers/auth.route.js";
import messageRoutes from "./routers/message.route.js";
import { connectDB } from "./lib/db.js";
import { initSocket } from "./socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  "https://chat-app-phi-ashen-92.vercel.app",
  "https://chat-7k7mdg3eu-sharique-baigs-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true, // 👈 must for cookies
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => res.send("Backend is running..."));

// ✅ Socket.io init
const { io, userSocketMap } = initSocket(server, allowedOrigins);

// ✅ DB + server listen
server.listen(PORT, async () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
  await connectDB();
});
