const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');

/**
 * Express middleware that protects routes by verifying a Bearer JWT token.
 * Attaches the authenticated user to `req.user` if the token is valid.
 * @async
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @throws {Error} If no token is provided or the token is invalid/expired
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);

      req.user = await User.findOne({ uid: decoded.uid });

      if (!req.user) {
        res.status(401);
        throw new Error('User not found');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

module.exports = { protect };
