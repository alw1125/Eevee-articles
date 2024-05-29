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
  const comments = await db.all(`SELECT desc, date, time, user_id, comment_id FROM Comments`);
  return comments;
}

//return first layer comments by article id
export async function getCommentsByArt(article_id){

  const db = await getDatabase();
  const comments = await db.all(`SELECT Comments.*, Users.username FROM Comments INNER JOIN Users ON Comments.user_id = Users.user_id WHERE article_id = ? AND parent_comment_id is NULL`,
  article_id
  );
  return comments;
}

export async function deleteComment(comment_id) {
  const db = await getDatabase();
  const deleteComm = await db.run(`DELETE FROM Comments WHERE comment_id = ?`, comment_id);
  console.log(deleteComm.changes);
  // Return true if changes applied, false otherwise
  return deleteComm.changes > 0;
}