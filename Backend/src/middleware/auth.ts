import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string; firstName: string; role: string };
}

/*export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
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
};*/


// backend/middleware/auth.ts

export const authenticate = (req: Request, res: Response, next: NextFunction):void => {
  // Extract token from Authorization header (format: "Bearer <token>")
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // If no token is provided, return an error
  if (!token) {
     res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      req.user = decoded as { id: string; firstName: string; role: string };
    } else {
       res.status(401).json({ message: "Unauthorized: Invalid token" });
       return;
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }
};