import bcrypt from "bcrypt";

export async function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return await bcrypt.hash(password, salt);
}

export async function compareHashed(plaintext, hashpassword) {
  const isMatch = await bcrypt.compare(plaintext, hashpassword);
  return isMatch;
}
