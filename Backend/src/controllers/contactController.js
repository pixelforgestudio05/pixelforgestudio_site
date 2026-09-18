import pool from "../config/db.js";

/* =========================================================
   PUBLIC - SUBMIT CONTACT
========================================================= */

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO messages
      (name, email, phone, service, message)
      VALUES (?, ?, ?, ?, ?)`,
      [
        name.trim(),
        email.trim(),
        phone?.trim() || null,
        service.trim(),
        message.trim(),
      ],
    );

    res.status(201).json({
      success: true,
      message: "Your message has been received.",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Contact submission error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

/* =========================================================
   ADMIN - GET MESSAGES
========================================================= */

export const getMessages = async (req, res) => {
  try {
    const [messages] = await pool.execute(
      `SELECT id, name, email, phone, service, message, status, created_at
       FROM messages
       ORDER BY created_at DESC`,
    );

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages.",
    });
  }
};

/* =========================================================
   ADMIN - UPDATE MESSAGE STATUS
========================================================= */

export const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["new", "read", "replied"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message status.",
      });
    }

    const [result] = await pool.execute(
      `UPDATE messages
       SET status = ?
       WHERE id = ?`,
      [status, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.json({
      success: true,
      message: "Message status updated successfully.",
    });
  } catch (error) {
    console.error("Update message status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update message.",
    });
  }
};

/* =========================================================
   ADMIN - DELETE MESSAGE
========================================================= */

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      `DELETE FROM messages
       WHERE id = ?`,
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete message.",
    });
  }
};
