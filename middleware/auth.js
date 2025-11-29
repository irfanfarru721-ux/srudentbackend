import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Normal user authentication
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Only admin can access
export const adminOnly = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next();
};
