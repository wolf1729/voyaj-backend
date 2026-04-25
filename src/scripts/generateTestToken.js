const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

const admin = require('../config/firebase');
const https = require('https');

/**
 * Script to generate a Firebase ID Token for testing purposes.
 * 
 * Usage:
 * node src/scripts/generateTestToken.js [uid] [email]
 */

async function generateTestToken() {
  const uid = process.argv[2] || `test-user-${Math.floor(Math.random() * 100000)}`;
  const email = process.argv[3] || `${uid}@example.com`;
  const apiKey = process.env.FIREBASE_API_KEY;

  if (!apiKey) {
    console.error('Error: FIREBASE_API_KEY not found in environment variables.');
    process.exit(1);
  }

  console.log(`Generating token for UID: ${uid} (Email: ${email})...`);

  try {
    // 1. Create a custom token using Firebase Admin SDK
    const customToken = await admin.auth().createCustomToken(uid, { email });
    console.log('Custom token generated successfully.');

    // 2. Exchange custom token for an ID token using Firebase Auth REST API
    const postData = JSON.stringify({
      token: customToken,
      returnSecureToken: true
    });

    const options = {
      hostname: 'identitytoolkit.googleapis.com',
      port: 443,
      path: `/v1/accounts:signInWithCustomToken?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const response = JSON.parse(data);
        if (response.idToken) {
          console.log('\n--- SUCCESS ---');
          console.log('Firebase ID Token:');
          console.log(response.idToken);
          console.log('\n--- USE THIS TOKEN IN YOUR AUTHORIZATION HEADER ---');
          console.log(`Authorization: Bearer ${response.idToken}`);
          process.exit(0);
        } else {
          console.error('Error exchanging custom token:', response.error);
          process.exit(1);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request Error:', error);
      process.exit(1);
    });

    req.write(postData);
    req.end();

  } catch (error) {
    console.error('Failed to generate token:', error.message);
    process.exit(1);
  }
}

generateTestToken();
