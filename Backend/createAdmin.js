import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import pool from "./src/config/db.js";

dotenv.config();

const createAdmin = async () => {
  const name = "PixelForge Admin";
  const email = "pixelforgestudio05@gmail.com";
  const password = process.env.ADMIN_PASSWORD;

  if (!password || password.length < 8) {
    console.error("Set a strong ADMIN_PASSWORD in .env first.");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await pool.query(
    `INSERT INTO admins (name, email, password)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO NOTHING
     RETURNING id`,
    [name, email.toLowerCase(), hashedPassword],
  );

  if (result.rowCount === 0) {
    console.log("Admin already exists.");
  } else {
    console.log("Admin account created. ID:", result.rows[0].id);
  }

  await pool.end();
};

createAdmin().catch((error) => {
  console.error("Failed to create admin:", error);
  process.exit(1);
});
