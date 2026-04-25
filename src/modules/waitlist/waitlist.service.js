const Waitlist = require('../../models/Waitlist');

/**
 * Adds an email to the waitlist.
 * @param {string} email - The email to add
 * @returns {Promise<Object>} The created waitlist entry
 */
const addToWaitlist = async (email) => {
  const existingEntry = await Waitlist.findOne({ email });
  if (existingEntry) {
    throw new Error('Email already on waitlist');
  }
  
  return await Waitlist.create({ email });
};

module.exports = {
  addToWaitlist,
};
