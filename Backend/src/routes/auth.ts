import express from "express";
import multer from "multer";
import { register, login, refreshToken, logout, getProfile, Setting, getUser, updateUser } from "../controllers/auth";
import { getBestPerformers } from "../controllers/leaderboard";
import { verifyOTP } from "../utils/endpoint/verifyOTP";
import { submitContactForm } from "../controllers/contact";
import { forgotPassword, resetPassword } from "../controllers/forgotPwd";
import uploadQuestions from "../controllers/Uploadquestions";
import { examTypes, subjects , years , Questions , validateAnswer} from "../controllers/exams";
import { submitExamResult } from "../controllers/examResultController";
import { authenticate } from "../middleware/auth";
import { getPerformance } from "../controllers/performanceController";
import { getStats } from "../controllers/referral";
import { getExamHistory } from "../controllers/examHistory";
 
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
router.get("/get-user/:id", getUser);
router.get("/performance", authenticate, getPerformance);
router.get("/referral-stats", authenticate, getStats);
router.get("/exam-history", authenticate, getExamHistory);
//router.put("/settings", Setting);
router.put("/update-user/:id", updateUser);

export default router;