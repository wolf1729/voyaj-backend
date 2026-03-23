const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { protect } = require('../../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Example protected route
router.get('/me', protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
