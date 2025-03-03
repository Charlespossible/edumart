import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string; firstName: string; role: string };
}


export const authenticate = (req: Request, res: Response, next: NextFunction):void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
     res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      req.user = decoded as { id: string; firstName: string; role: string };
    } else {
       res.status(401).json({ message: "Unauthorized: Invalid token" });
       return;
    }
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }
};