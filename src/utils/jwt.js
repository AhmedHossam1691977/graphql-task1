import jwt from "jsonwebtoken";

export const getUserFromToken = (token) => {
  if (!token) return null;
  try {
    return jwt.verify("supersecret");
  } catch {
    return null;
  }
};
