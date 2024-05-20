import { getDatabase } from "./database.js";

/**
 * @returns the user with the matching username, or undefined.
 */
export async function getUserWithUsername(user_name) {
  const db = await getDatabase();
  return await db.get("SELECT * from Users WHERE user_name = ?", user_name);
}

/**
 * @returns the user with the given credentials, or undefined.
 */
export async function getUserWithCredentials(user_name, password) {
  const db = await getDatabase();
  return await db.get(
    "SELECT * from Users WHERE user_name = ? AND password = ?",
    user_name,
    password
  );
}