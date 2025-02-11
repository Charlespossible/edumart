import express from "express";
import { register, login, refreshToken, logout } from "../controllers/auth";
import { verifyOTP } from "../utils/endpoint/verifyOTP";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.post("/verifyOTP", verifyOTP);

export default router;
