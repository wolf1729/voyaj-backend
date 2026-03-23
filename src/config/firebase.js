const admin = require('firebase-admin');

// Note: For production, you should use a service account key file path
// or environment variables for each field.
// Here we assume the service account JSON path is in FIREBASE_SERVICE_ACCOUNT

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin Initialized');
  } catch (error) {
    console.error(`Firebase Initialization Error: ${error.message}`);
  }
}

module.exports = admin;
