import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Access Denied. No token provided." });

  const token = authHeader.split(" ")[1]; // Bearer Token
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);
    (req as any).user = verified; // Attach user info to request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
// Compare this snippet from Backend/src/controllers/auth.ts: