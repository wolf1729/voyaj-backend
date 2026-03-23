const authService = require('./auth.service');
const Joi = require('joi');

/**
 * @desc    Register a new user after Firebase Auth
 * @route   POST /api/auth/register
 * @access  Public
 * @param {import('express').Request} req - Express request object. Body: { idToken, username, img }
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>} JSON response with success flag, user data, and JWT token
 */
const register = async (req, res) => {
  const schema = Joi.object({
    idToken: Joi.string().required(),
    username: Joi.string().required(),
    img: Joi.string().allow(''),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { idToken, username, img } = req.body;

  const decodedToken = await authService.verifyFirebaseToken(idToken);
  const { uid, email } = decodedToken;

  const result = await authService.registerUser({
    uid,
    email,
    username,
    img,
  });

  res.status(201).json({
    success: true,
    ...result,
  });
};

/**
 * @desc    Login user after Firebase Auth
 * @route   POST /api/auth/login
 * @access  Public
 * @param {import('express').Request} req - Express request object. Body: { idToken }
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>} JSON response with success flag, user data, and JWT token
 */
const login = async (req, res) => {
  const schema = Joi.object({
    idToken: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { idToken } = req.body;

  const decodedToken = await authService.verifyFirebaseToken(idToken);
  const { uid } = decodedToken;

  const result = await authService.loginUser(uid);

  res.json({
    success: true,
    ...result,
  });
};

module.exports = {
  register,
  login,
};
