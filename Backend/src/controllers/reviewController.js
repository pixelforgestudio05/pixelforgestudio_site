import pool from "../config/db.js";

/* =========================================================
   PUBLIC - APPROVED REVIEWS
========================================================= */

export const getApprovedReviews = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, role, review, rating, status, created_at
       FROM reviews
       WHERE status = 'approved'
       ORDER BY created_at DESC`,
    );

    res.json({
      success: true,
      reviews: result.rows,
    });
  } catch (error) {
    console.error("Get approved reviews error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews.",
    });
  }
};

/* =========================================================
   PUBLIC - SUBMIT REVIEW
========================================================= */

export const submitReview = async (req, res) => {
  try {
    const { name, role, review, rating } = req.body;

    if (!name || !role || !review || !rating) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    const result = await pool.query(
      `INSERT INTO reviews
      (name, role, review, rating, status)
      VALUES ($1, $2, $3, $4, 'pending')
      RETURNING id`,
      [name.trim(), role.trim(), review.trim(), numericRating],
    );

    res.status(201).json({
      success: true,
      message: "Review submitted successfully and is waiting for approval.",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Submit review error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit review.",
    });
  }
};

/* =========================================================
   ADMIN - ALL REVIEWS
========================================================= */

export const getAllReviews = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, role, review, rating, status, created_at
       FROM reviews
       ORDER BY created_at DESC`,
    );

    res.json({
      success: true,
      reviews: result.rows,
    });
  } catch (error) {
    console.error("Get all reviews error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews.",
    });
  }
};

/* =========================================================
   ADMIN - UPDATE REVIEW STATUS
========================================================= */

export const updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "approved", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review status.",
      });
    }

    const result = await pool.query(
      `UPDATE reviews
       SET status = $1
       WHERE id = $2`,
      [status, id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    res.json({
      success: true,
      message: `Review ${status} successfully.`,
    });
  } catch (error) {
    console.error("Update review status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update review.",
    });
  }
};

/* =========================================================
   ADMIN - DELETE REVIEW
========================================================= */

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM reviews
       WHERE id = $1`,
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    res.json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    console.error("Delete review error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete review.",
    });
  }
};
