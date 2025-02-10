import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient;

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;
  
      // Find user by email
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      // Check OTP validity
      if (user.otp !== otp || new Date() > user.otpExpires!) {
        res.status(400).json({ message: "Invalid or expired OTP" });
        return;
      }
  
      // Clear OTP after successful verification
      await prisma.user.update({
        where: { id: user.id },
        data: { otp: null, otpExpires: null },
      });
  
      // Generate final auth token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: '3d' }
      );
  
      res.status(200).json({ 
        message: "OTP verified successfully!",
        token,
        user: { id: user.id, email: user.email, firstName: user.firstName }
      });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };