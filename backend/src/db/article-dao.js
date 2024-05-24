/**
 * This file contains a dummy DAO for the "Messages" database. You should
 * create your own DAOs for your project, and get rid of this one.
 */

import { getDatabase } from "./database.js";

export async function postArticle(title, username, text, date) {
  const db = await getDatabase();
  const postResult = await db.run(`INSERT INTO Articles (title, username, text, date) VALUES (?, ?, ?, ?)`,
  title, username, text, date);

  // Return true if changes applied, false otherwise
  return postResult.changes > 0;
}

export async function getAllArticles() {
  const db = await getDatabase();
  const articles = await db.all(`SELECT title, username, text, date FROM Articles`);
  return articles;
}
