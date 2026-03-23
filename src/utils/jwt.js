const jwt = require('jsonwebtoken');

/**
 * Signs a JWT token with the provided payload.
 * @param {Object} payload - The data to encode in the token
 * @returns {string} Signed JWT token string
 */
const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

/**
 * Verifies a JWT token and returns the decoded payload.
 * @param {string} token - The JWT token to verify
 * @returns {Object} Decoded token payload
 * @throws {Error} If the token is invalid or expired
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  signToken,
  verifyToken,
};
