import { getDatabase } from "./database.js";

export async function postComment(desc, date, time, user_id, article_id, parent_comment_id) {
  const db = await getDatabase();
  const postResult = await db.run(`INSERT INTO Comments (desc, date, time, user_id, article_id, parent_comment_id) VALUES (?, ?, ?, ?, ?, ?)`,
  desc, date, time, user_id, article_id, parent_comment_id);

  // Return true if changes applied, false otherwise
  return postResult.changes > 0;
}

export async function getAllComments() {
  const db = await getDatabase();
  const comments = await db.all(`SELECT Comments.*, Users.username FROM Comments JOIN Users ON Comments.user_id = Users.user_id`);
  return comments;
}

export async function getCommentsByArt(article_id){

  const db = await getDatabase();
  const comments = await db.all(`SELECT Comments.*, Users.username, Users.avatar FROM Comments INNER JOIN Users ON Comments.user_id = Users.user_id WHERE article_id = ?`,
  article_id
  );
  let commentTree = unflatten(comments);
  return commentTree;
}

const unflatten = data => {
  const tree = data.map(e => ({...e}))
    .sort((a, b) => a.comment_id - b.comment_id)
    .reduce((a, e) => {
      a[e.comment_id] = a[e.comment_id] || e;
      a[e.parent_comment_id] = a[e.parent_comment_id] || {};
      const parent = a[e.parent_comment_id];
      parent.children = parent.children || [];
      parent.children.push(e);
      return a;
    }, {})
  ;
  return Object.values(tree)
    .find(e => e.comment_id === undefined).children;
};

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