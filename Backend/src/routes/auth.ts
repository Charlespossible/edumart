import express from "express";
import multer from "multer";
import { register, login, refreshToken, logout, getProfile, Setting, Getuser } from "../controllers/auth";
import { getBestPerformers } from "../controllers/leaderboard";
import { verifyOTP } from "../utils/endpoint/verifyOTP";
import { submitContactForm } from "../controllers/contact";
import { forgotPassword, resetPassword } from "../controllers/forgotPwd";
import uploadQuestions from "../controllers/Uploadquestions";
import { examTypes, subjects , years , Questions , validateAnswer} from "../controllers/exams";
import { submitExamResult } from "../controllers/examResultController";
import { authenticate } from "../middleware/auth";
import { getPerformance } from "../controllers/performanceController";

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
router.post("/upload-questions", upload.array("files"),  uploadQuestions);
router.get("/profile", getProfile);
router.get("/exam-types", examTypes);
router.get("/subjects", subjects);
router.get("/years", years);
router.get("/questions", Questions);
router.post("/validate-answer", validateAnswer);
router.post("/submit-result", submitExamResult);
router.get("/getUser", Getuser);
router.get("/performance", authenticate, getPerformance);
router.put("/settings", Setting);

export default router;
