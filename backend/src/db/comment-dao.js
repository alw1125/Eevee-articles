import { getDatabase } from "./database.js";

export async function postComment(user_id, text, date) {
  const db = await getDatabase();
  const postResult = await db.run(`INSERT INTO Comments (user_id, text, date) VALUES (?, ?, ?)`,
  user_id, text, date);

  // Return true if changes applied, false otherwise
  return postResult.changes > 0;
}

export async function getAllComments() {
  const db = await getDatabase();
  const comments = await db.all(`SELECT user_id, text, date FROM Comments`);
  return comments;
}
