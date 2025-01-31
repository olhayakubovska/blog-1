import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants.js";

export const generateToken = (userId) => {
  const token = jwt.sign(userId, TOKEN_SECRET, { expiresIn: "30d" });

  return token;
};

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, TOKEN_SECRET);
  return decoded;
};
