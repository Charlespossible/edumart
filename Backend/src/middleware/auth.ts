import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string; firstName: string; role: string };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is missing");

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; firstName: string; role: string };
    req.user = decoded;
    next();

  } catch (error) {
    console.error("Token Verification Error:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};
