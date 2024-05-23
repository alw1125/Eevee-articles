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
    dob: yup.string().optional(),
    description: yup.string().min(1).max(500).required(),
    password: yup.string().min(5).required()
  })
  .required();

  /**
 * Schema for "update user". We can optionally supply a first name, last name, password, and / or desc. We cannot edit thde username or username,
 * or supply any other random data.
 */
const updateUserSchema = yup
.object({
  username: yup.string().min(1).optional(),
  firstName: yup.string().min(1).optional(),
  lastName: yup.string().min(1).optional(),
  dob: yup.string().optional(),
  password: yup.string().min(5).optional(),
  desc: yup.string().max(500).optional()
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

  /**
 * Updates the user with the given username if it exists, with the given update data. Update data can optionally include a firstName, lastName,
 * password, and / or desc.
 *
 * @param {*} username the username to update, will be converted to a number using parseInt().
 * @param {*} udpateData the update data to apply.
 * @returns true if the database was updated, false otherwise
 * @throws an error if updateData is invalid.
 */
export async function updateUser(username, udpateData) {
  // Validate incoming data (throw error if invalid)
  const parsedUpdateData = updateUserSchema.validateSync(udpateData, {
    abortEarly: false,
    stripUnknown: true
  });

  // Build and run update statement
  const [updateOperations, updateParams] = buildUpdateStatement(parsedUpdateData);
  const sql = `UPDATE Users SET ${updateOperations} WHERE username = ?`;
  console.log(sql);
  const db = await getDatabase();
  const dbResult = await db.run(sql, ...updateParams, username);

  // Return true if changes applied, false otherwise
  return dbResult.changes > 0;
}

function buildUpdateStatement(obj) {
  const updateOperations = [];
  const updateParams = [];

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    updateOperations.push(`${key} = ?`);
    updateParams.push(value);
  }

  return [updateOperations.join(", "), updateParams];
}

