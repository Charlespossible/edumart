import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5173", 
      credentials: true,
    })
  );
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin", authRoutes);
app.use("/api/exam", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
