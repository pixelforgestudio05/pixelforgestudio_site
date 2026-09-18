import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../../data");

const files = {
  messages: path.join(dataPath, "messages.json"),
  reviews: path.join(dataPath, "reviews.json"),
  admins: path.join(dataPath, "admins.json"),
};

export const readData = async (type) => {
  try {
    const file = files[type];

    if (!file) {
      throw new Error(`Invalid data type: ${type}`);
    }

    const data = await fs.readFile(file, "utf-8");

    return JSON.parse(data || "[]");
  } catch (error) {
    console.error(`Failed to read ${type}:`, error);
    return [];
  }
};

export const writeData = async (type, data) => {
  try {
    const file = files[type];

    if (!file) {
      throw new Error(`Invalid data type: ${type}`);
    }

    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");

    return true;
  } catch (error) {
    console.error(`Failed to write ${type}:`, error);
    throw error;
  }
};

export const getNextId = (items) => {
  if (!items.length) {
    return 1;
  }

  return Math.max(...items.map((item) => Number(item.id) || 0)) + 1;
};
