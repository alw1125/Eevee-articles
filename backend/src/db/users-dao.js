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

/**
 * Schema for "update user". We can optionally supply a first name, last name, password, and / or desc. We cannot edit thde username or username,
 * or supply any other random data.
 */
const UserSchema = yup
  .object({
    firstName: yup.string().min(1).optional(),
    lastName: yup.string().min(1).optional(),
    username: yup.string().min(1).optional(),
    password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      "^(?=.[A-Za-z])(?=.d)(?=.[@$!%#?&])[A-Za-zd@$!%*#?&]{8,}$",
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    dob: yup.date().optional(),
    description: yup.string().min(1).max(100).optional()
  })
  .required();

  export async function createUser(firstName, lastName, username, password, dob, description) {
    const parsedUpdateData = UserSchema.validateSync(udpateData, {
      abortEarly: false,
      stripUnknown: true
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
