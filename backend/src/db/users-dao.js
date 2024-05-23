import yup from "yup";
import { getDatabase } from "./database.js";

/**
 * Gets the user with the given username, if it exists.
 *
 * @param {string} username the username to search
 * @returns the user with the matching username, or undefined.
 */
export async function getUserWithUsername(username) {
  const db = await getDatabase();
  return await db.get("SELECT * from Users WHERE username = ?", username);
}

/**
 * Gets the user with the given username and password, if it exists.
 *
 * @param {string} username the username to search
 * @param {*} password the password to search
 * @returns the user with the given credentials, or undefined.
 */
export async function getUserWithCredentials(username, password) {
  const db = await getDatabase();
  return await db.get(
    "SELECT * from Users WHERE username = ? AND password = ?",
    username,
    password
  );
}

const createUserSchema = yup
  .object({
    username: yup.string().min(1).required(),
    firstName: yup.string().min(1).required(),
    lastName: yup.string().min(1).required(),
    dob: yup.date().optional(),
    description: yup.string().min(1).max(500).required(),
    password: yup.string().min(5).required()
  })
  .required();

  export async function createUser(createData) {

    const parsedCreatedData = createUserSchema.validateSync(createData, {
      abortEarly: false,
      stripUnknown: true
    });
    
    var dob = new Date(parsedCreatedData.dob).toISOString().slice(0, 10);

    const sql = `INSERT INTO Users (username, firstname, lastName, dob, desc, password) VALUES (?, ?, ?, ?, ?, ?)`;    
    const db = await getDatabase();
    const dbResult = await db.run(sql, parsedCreatedData.username, parsedCreatedData.firstName, parsedCreatedData.lastName, dob, parsedCreatedData.description, parsedCreatedData.password);

    // Return true if changes applied, false otherwise
    return dbResult.changes > 0;
  }
