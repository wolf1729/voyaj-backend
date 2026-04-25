const admin = require('firebase-admin');

// Note: For production, you should use a service account key file path
// or environment variables for each field.
// Here we assume the service account JSON path is in FIREBASE_SERVICE_ACCOUNT

if (!admin.apps.length) {
  try {
    let sa = process.env.FIREBASE_SERVICE_ACCOUNT;
    
    if (!sa) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is missing');
    }

    // Handle case where the string might be wrapped in extra quotes
    if (sa.startsWith("'") && sa.endsWith("'")) {
      sa = sa.slice(1, -1);
    } else if (sa.startsWith('"') && sa.endsWith('"')) {
      sa = sa.slice(1, -1);
    }

    const serviceAccount = typeof sa === 'string' ? JSON.parse(sa) : sa;
    
    // Handle escaped newlines in private key if it comes from .env or dashboard
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin Initialized successfully');
  } catch (error) {
    console.error(`Firebase Initialization Error: ${error.message}`);
    // Log more details about the environment variable (safely)
    const saValue = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (saValue) {
      console.error(`FIREBASE_SERVICE_ACCOUNT length: ${saValue.length}`);
      console.error(`FIREBASE_SERVICE_ACCOUNT starts with: ${saValue.substring(0, 20)}...`);
    } else {
      console.error('FIREBASE_SERVICE_ACCOUNT is undefined or empty');
    }
  }
}

module.exports = admin;
