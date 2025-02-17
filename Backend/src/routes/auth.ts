import express from "express";
import { register, login, refreshToken, logout, getProfile } from "../controllers/auth";
import { getBestPerformers } from "../controllers/leaderboard";
import { verifyOTP } from "../utils/endpoint/verifyOTP";
import { submitContactForm } from "../controllers/contact";
import { forgotPassword, resetPassword } from "../controllers/forgotPwd";
import uploadQuestions from "../controllers/Uploadquestions";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.post("/verifyOTP", verifyOTP);
router.get("/leaderboard", getBestPerformers);
router.post("/contact", submitContactForm);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/upload-questions", upload.single("file"),  uploadQuestions);
router.get("/profile", getProfile);

export default router;
