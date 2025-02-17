import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Forgot Password: Send reset link
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
  
      // Check if user exists
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      // Generate reset token
      const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  
      // Save reset token to the database
      await prisma.user.update({
        where: { id: user.id },
        data: { resetToken },
      });
  
      // Send reset link via email
      const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        text: `Click the link to reset your password: ${resetLink}`,
        html: `<p>Click the link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: "Reset link sent to your email" });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // Reset Password: Update password
  export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, newPassword } = req.body;
  
      // Verify reset token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
  
      if (!user || user.resetToken !== token) {
        res.status(400).json({ message: "Invalid or expired token" });
        return;
      }
  
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update password and clear reset token
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword, resetToken: null },
      });
  
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

 




