import nodemailer from "nodemailer";

export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail as the email service
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail email address
      pass: process.env.EMAIL_PASSWORD, // Your Gmail app password
    },
  });
  
  // Function to send OTP email
  export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to: email, // Recipient email address
      subject: "Email Verification OTP", // Email subject
      text: `Your OTP for email verification is: ${otp}`, // Plain text body
      html: `<p>Your OTP for email verification is: <strong>${otp}</strong></p>`, // HTML body
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`OTP email sent to ${email}`);
    } catch (error) {
      console.error("Error sending OTP email:", error);
      throw new Error("Failed to send OTP email");
    }
  };