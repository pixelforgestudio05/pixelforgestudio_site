import express from "express";
import {
  loginAdmin,
  registerAdmin,
  getMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Login
router.post("/login", loginAdmin);

// Logged-in admin can create another admin
router.post("/register", protect, registerAdmin);

// Check current admin
router.get("/me", protect, getMe);

export default router;
