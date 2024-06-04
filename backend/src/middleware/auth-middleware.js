import { getUserWithUsername } from "../db/users-dao.js";
import { getUsernameFromJWT, getAdminStatusFromJWT } from "../utils/jwt-utils.js";



/**
 * A middleware which will get the auth JWT from req.cookies.authToken, verify it, find the matching user, and add it to req.user.
 *
 * If any of those processes fail, a 401 status will be returned. Otherwise, the next() function will be called to continue executing
 * your route handlers.
 */
export async function requiresAuthentication(req, res, next) {
  if (!req.cookies.authToken) return res.sendStatus(401);

  try {
    const username = getUsernameFromJWT(req.cookies.authToken);
    console.log('I WANT TO SEE');
    console.log(username);
    const user = await getUserWithUsername(username);
    if (!user) return res.sendStatus(401);
    req.user = user;
    return next();
  } catch {
    return res.sendStatus(401);
  }
}

export async function requiresAdminAuthentication(req, res, next) {
  console.log('I WANT TO SEE');
  console.log(req.cookies.authToken);
  if (!req.cookies.authToken) return res.sendStatus(401);

  try {
    const adminStatus = getAdminStatusFromJWT(req.cookies.authToken);
    
    if (adminStatus !== '1') return res.sendStatus(403);
    req.adminStatus = adminStatus;
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
}