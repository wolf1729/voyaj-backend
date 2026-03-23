const admin = require('../../config/firebase');
const User = require('../../models/User');
const { signToken } = require('../../utils/jwt');

/**
 * Verify Firebase ID Token and extract user info
 * @param {string} idToken 
 * @returns {Promise<Object>} decoded token info
 */
const verifyFirebaseToken = async (idToken) => {
  try {
    return await admin.auth().verifyIdToken(idToken);
  } catch (error) {
    throw new Error('Invalid Firebase token');
  }
};

/**
 * Register a new user in the database
 * @param {Object} userData { uid, email, username, img }
 * @returns {Promise<Object>} created user and token
 */
const registerUser = async (userData) => {
  const { uid, email, username, img } = userData;

  // Check if user already exists in DB
  const userExists = await User.findOne({ uid });
  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    uid,
    email,
    username,
    img,
  });

  if (!user) {
    throw new Error('Invalid user data');
  }

  return {
    user: {
      uid: user.uid,
      email: user.email,
      username: user.username,
      img: user.img,
    },
    token: signToken({ uid: user.uid }),
  };
};

/**
 * Login user by verifying Firebase token and checking DB record
 * @param {string} uid 
 * @returns {Promise<Object>} user and token
 */
const loginUser = async (uid) => {
  const user = await User.findOne({ uid });

  if (!user) {
    throw new Error('User record not found in database. Please register.');
  }

  return {
    user: {
      uid: user.uid,
      email: user.email,
      username: user.username,
      img: user.img,
    },
    token: signToken({ uid: user.uid }),
  };
};

module.exports = {
  verifyFirebaseToken,
  registerUser,
  loginUser,
};
