const waitlistService = require('./waitlist.service');

/**
 * @desc    Add email to waitlist
 * @route   POST /api/waitlist
 * @access  Public
 */
const joinWaitlist = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email',
      });
    }

    const entry = await waitlistService.addToWaitlist(email);

    res.status(201).json({
      success: true,
      data: entry,
      message: 'Successfully joined the waitlist!',
    });
  } catch (error) {
    if (error.message === 'Email already on waitlist') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

module.exports = {
  joinWaitlist,
};
