import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies); // 👀
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log("JWT verification error:", err.message); // 👀
      return res.status(401).json({ message: "Unauthorized, invalid or expired token" });
    }

    console.log("Decoded token:", decoded); // 👀

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


