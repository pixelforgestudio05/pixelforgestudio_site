import express from "express";

import {
  submitContact,
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from "../controllers/contactController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* Public */
router.post("/", submitContact);

/* Protected Admin */
router.get("/", protect, getMessages);

router.patch("/:id/status", protect, updateMessageStatus);

router.delete("/:id", protect, deleteMessage);

export default router;
