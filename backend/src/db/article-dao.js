/**
 * This file contains a dummy DAO for the "Messages" database. You should
 * create your own DAOs for your project, and get rid of this one.
 */

import { getDatabase } from "./database.js";

export async function postArticle(title, image, user_id, text, date) {
  const db = await getDatabase();
  const postResult = await db.run(`INSERT INTO Articles (title, image, user_id, text, date) VALUES (?, ?, ?, ?, ?)`,
  title, image, user_id, text, date);

  // Return true if changes applied, false otherwise
  return postResult.changes > 0;
}


export async function getAllArticles() {
  const db = await getDatabase();
  const articles = await db.all(`
      SELECT Articles.article_id, Articles.title, Articles.user_id, Articles.text, Articles.date, Users.username
      FROM Articles
      INNER JOIN Users ON Articles.user_id = Users.user_id
  `);
  return articles;
}


export async function getArticleByID(id){
  const db = await getDatabase();
  const articleByID = await db.get('SELECT Articles.*, Users.username FROM Articles INNER JOIN Users ON Articles.user_id = Users.user_id WHERE article_id = ?', id);
  return articleByID;
}

export async function deleteArticle(article_id) {
  const db = await getDatabase();
  const deleteComm = await db.run(`DELETE FROM Articles WHERE article_id = ?`, article_id);
  console.log(deleteComm.changes);
  // Return true if changes applied, false otherwise
  return deleteComm.changes > 0;
}

//likes below

export async function getArticleLikesCount(article_id) {
  const db = await getDatabase();
  const result = await db.get(
    `SELECT COUNT(*) AS likeCount FROM UserLikedArticles WHERE article_id = ?`,
    article_id
  );
  

  return result.likeCount;
  
}
export async function checkIfArticleIsLiked (user_id, article_id) {
  const db = await getDatabase();
  const result = await db.get(`SELECT COUNT (*) as count FROM UserLikedArticles WHERE user_id = ? AND article_id = ?`, user_id, article_id);
 
 // Return true if changes applied, false otherwise
  return result.count> 0;
}

export async function likeArticle( user_id, article_id) {
  const db = await getDatabase();
  const postResult = await db.run(`INSERT INTO UserLikedArticles (user_id, article_id) VALUES (?, ?)`,
  user_id, article_id);

  // Return true if changes applied, false otherwise
  return postResult.changes > 0;
}


export async function unlikeArticle(user_id, article_id) {
  const db = await getDatabase();
  const deleteResult = await db.run(`DELETE FROM UserLikedArticles WHERE user_id = ? AND article_id = ?`, user_id, article_id);
  
  // Return true if changes applied, false otherwise
  return deleteResult.changes > 0; }




