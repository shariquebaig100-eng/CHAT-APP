import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { app, server } from "./lib/socket.js"; // ✅ tuhara socket file
import { connectDB } from "./lib/db.js";
import authRoutes from "./routers/auth.route.js";
import messageRoutes from "./routers/message.route.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://chat-app-phi-ashen-92.vercel.app",
  "https://chat-7k7mdg3eu-sharique-baigs-projects.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}));


// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => res.send("Backend is running..."));

// ✅ Connect to MongoDB
connectDB().then(() => {
  // ✅ Start server
  server.listen(PORT, () => {
    console.log(`🚀 Server running on PORT: ${PORT}`);
  });
});
