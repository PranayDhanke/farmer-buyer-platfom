// lib/firebaseAdmin.js
import admin from 'firebase-admin';

const key = process.env.FIREBASE_PRIVATE_KEY
if (!admin.apps.length && key) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: key.replace(/\\n/g, '\n'),
    }),
  });
}

export const adminAuth = admin.auth();
