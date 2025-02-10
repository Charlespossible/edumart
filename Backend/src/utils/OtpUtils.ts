export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
    // Implement your email sending logic (e.g., using Nodemailer)
    console.log(`OTP for ${email}: ${otp}`); // Remove this in production
  };