import express from "express";
import { loginUser, getCurrentUser, registerUser } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/me', protect, getCurrentUser)

export default router;