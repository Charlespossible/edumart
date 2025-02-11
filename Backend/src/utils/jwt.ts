import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

// Generate Access Token (short-lived)
export const generateAccessToken = (user: { id: string; firstName: string; role: string }) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "15m" }); // 15 minutes expiry
};

// Generate Refresh Token (long-lived)
export const generateRefreshToken = (user: { id: string; firstName: string; role: string }) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "7d" }); // 7 days expiry
};
