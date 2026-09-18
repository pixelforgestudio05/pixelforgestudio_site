import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const name = "PixelForge Admin";
  const email = "pixelforgestudio05@gmail.com";

  const password = "admin";

  const hashedPassword = await bcrypt.hash(password, 12);

  await connection.execute(
    `
    INSERT INTO admins
    (
      name,
      email,
      password
    )
    VALUES (?, ?, ?)
    `,
    [name, email, hashedPassword],
  );

  console.log("Admin account created successfully.");

  await connection.end();
};

createAdmin().catch((error) => {
  console.error("Failed to create admin:", error);
});
