import jwt from "jsonwebtoken";

/**
 * Generate JWT token for a user
 * @param {string} userId - MongoDB user ID
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "defaultsecret",
    { expiresIn: "7d" } // token valid for 7 days
  );
};

export default generateToken;
