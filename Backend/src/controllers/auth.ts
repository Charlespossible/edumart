import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP , sendOTPEmail } from "../utils/OtpUtils";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";


// REGISTER FUNCTION
const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, phoneNumber, password, referer } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    // Generate OTP and expiration time (3 days)
    const otp = generateOTP(); // Generates a 6-digit number
    const otpExpires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with OTP
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        referer,
        otp,
        otpExpires,
      },
    });

    // Send OTP to user's email
    await sendOTPEmail(email, otp); // Implement email sending logic

    // Generate JWT token (valid for 3 days)
    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET!,
      { expiresIn: '3d' } // Token expires in 3 days
    );
      console.log({token});
    res.status(201).json({ 
      message: "Registration successful! OTP sent to your email.",
      token // Include token if needed for other purposes
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
  //console.log(token)
};

//Login Function
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    // Generate Tokens
    const accessToken = generateAccessToken({ id: user.id, firstName: user.firstName, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id, firstName: user.firstName, role: user.role });

    // Send refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });

    res.status(200).json({ accessToken, user: { firstName: user.firstName, role: user.role } });

  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Refresh Token Endpoint
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ message: "Refresh token missing" });
    return;
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken({ id: user.id, firstName: user.firstName, role: user.role });
    res.json({ accessToken: newAccessToken });
  });
};

// Logout Endpoint
export const logout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};


//OTP Verification

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