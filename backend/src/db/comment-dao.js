import { getDatabase } from "./database.js";

export async function postComment(desc, date, time, user_id) {
  const db = await getDatabase();
  const postResult = await db.run(`INSERT INTO Comments (desc, date, time, user_id) VALUES (?, ?, ?, ?)`,
  desc, date, time, user_id);

  // Return true if changes applied, false otherwise
  return postResult.changes > 0;
}

export async function getAllComments() {
  const db = await getDatabase();
  const comments = await db.all(`SELECT desc, date, time, user_id FROM Comments`);
  return comments;
}
