import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin.id,
      email: admin.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

/* =========================================================
   LOGIN ADMIN
========================================================= */

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const result = await pool.query(
      `SELECT id, name, email, password
       FROM admins
       WHERE email = $1
       LIMIT 1`,
      [email.trim().toLowerCase()],
    );

    const admins = result.rows;

    if (admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const admin = admins[0];

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(admin);

    res.json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong during login.",
    });
  }
};

/* =========================================================
   REGISTER ADMIN
========================================================= */

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await pool.query(
      `SELECT id FROM admins WHERE email = $1 LIMIT 1`,
      [normalizedEmail],
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "An admin with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO admins (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [name.trim(), normalizedEmail, hashedPassword],
    );

    res.status(201).json({
      success: true,
      message: "Admin account created successfully.",
      admin: {
        id: result.rows[0].id,
        name: name.trim(),
        email: normalizedEmail,
      },
    });
  } catch (error) {
    console.error("Register admin error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create admin account.",
    });
  }
};

/* =========================================================
   CURRENT ADMIN
========================================================= */

export const getMe = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email
       FROM admins
       WHERE id = $1
       LIMIT 1`,
      [req.admin.id],
    );

    const admins = result.rows;

    if (admins.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    res.json({
      success: true,
      admin: admins[0],
    });
  } catch (error) {
    console.error("Get admin error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load admin.",
    });
  }
};
