import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET as string;

// Generate Access Token (short-lived)

export const generateAccessToken = (user: { id: string; firstName: string; lastName: string; role: string }) => {
  if (!ACCESS_TOKEN_SECRET) throw new Error("JWT_SECRET is missing");
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "3d" });
};

export const generateRefreshToken = (user: { id: string; firstName: string; lastName: string; role: string}) => {
  if (!REFRESH_TOKEN_SECRET) throw new Error("JWT_REFRESH_SECRET is missing");
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
