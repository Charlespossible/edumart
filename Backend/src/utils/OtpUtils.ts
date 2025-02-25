import nodemailer from "nodemailer";
import dotenv from "dotenv";

export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
 
 
 
  // Load environment variables
  dotenv.config();
  
  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Ensure this is an App Password
    },
    // Optional: Configure retries and timeout
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    connectionTimeout: 30000, // 30 seconds
  });
  
  // Function to send OTP email
  export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`, // Add a friendly sender name
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}. This code is valid for 10 minutes. Please use it to verify your email address. If you did not request this, please ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Email Verification</h2>
          <p>Your OTP for email verification is: <strong>${otp}</strong></p>
          <p>This code is valid for 10 minutes. Please use it to verify your email address.</p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thank you,</p>
          <p>Your App Name</p>
        </div>
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`OTP email sent to ${email}`);
    } catch (error: any) {
      console.error("Error sending OTP email:", error);
      // Throw specific error messages based on error type
      if (error.responseCode === 535) {
        throw new Error("Authentication failed. Please check your email credentials.");
      } else if (error.code === "ENOTFOUND") {
        throw new Error("Network error. Please check your internet connection.");
      } else {
        throw new Error("Failed to send OTP email. Please try again later.");
      }
    }
  };
  