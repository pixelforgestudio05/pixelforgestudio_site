import express from "express";

import {
  getApprovedReviews,
  submitReview,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   PUBLIC
========================================================= */

router.get("/", getApprovedReviews);

router.post("/", submitReview);

/* =========================================================
   ADMIN
========================================================= */

router.get("/admin", protect, getAllReviews);

router.patch("/:id/status", protect, updateReviewStatus);

router.delete("/:id", protect, deleteReview);

export default router;
