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
  const comments = await db.all(`SELECT Comments.*, Users.username FROM Comments JOIN Users ON Comments.user_id = Users.user_id`);
  return comments;
}

export async function deleteCommentAsAdmin(comment_id) {
  const db = await getDatabase();
  const deleteComm = await db.run(`DELETE FROM Comments WHERE comment_id = ?`, comment_id);
  console.log(deleteComm.changes);
  // Return true if changes applied, false otherwise
  return deleteComm.changes > 0;
}

export async function deleteComment(comment_id, user_id) {
  const db = await getDatabase();

  // Check if the user owns the comment
  const comment = await db.get(`SELECT * FROM Comments WHERE comment_id = ? AND user_id = ?`, comment_id, user_id);
  if (comment) {
    const deleteComm = await db.run(`DELETE FROM Comments WHERE comment_id = ? AND user_id = ?`, comment_id, user_id);
    console.log(deleteComm.changes);
    return deleteComm.changes > 0;
  }

  // Check if the user owns the article related to the comment
  const article = await db.get(
    `SELECT Articles.* FROM Articles 
     JOIN Comments ON Articles.article_id = Comments.article_id 
     WHERE Comments.comment_id = ? AND Articles.user_id = ?`, 
     comment_id, user_id
  );
  if (article) {
    const deleteComm = await db.run(`DELETE FROM Comments WHERE comment_id = ?`, comment_id);
    console.log(deleteComm.changes);
    return deleteComm.changes > 0;
  }

  // If the user is not the owner of the comment or the article, deletion is not allowed
  return false;
}