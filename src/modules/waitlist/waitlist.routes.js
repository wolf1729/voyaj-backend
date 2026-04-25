const express = require('express');
const router = express.Router();
const waitlistController = require('./waitlist.controller');

router.post('/', waitlistController.joinWaitlist);

module.exports = router;
