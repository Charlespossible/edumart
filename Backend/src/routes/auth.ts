import express from "express";
import { register , login} from "../controllers/auth";
import { verifyOTP } from "../utils/endpoint/verifyOTP";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verifyOTP", verifyOTP);

export default router;
