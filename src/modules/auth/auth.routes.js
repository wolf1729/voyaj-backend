const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { protect } = require('../../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

/**
 * @desc    Get the currently authenticated user's profile
 * @route   GET /api/auth/me
 * @access  Private
 * @param {import('express').Request} req - Express request object with `req.user` populated by `protect` middleware
 * @param {import('express').Response} res - Express response object
 */
router.get('/me', protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
