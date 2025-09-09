import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true, // ✅ frontend JS cannot read cookie
      secure: process.env.NODE_ENV === "production", // ✅ HTTPS only in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ cross-origin support
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
  } catch (error) {
    console.log("Error generating token:", error);
  }
};
