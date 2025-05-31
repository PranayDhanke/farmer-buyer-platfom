// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getDatabase } from "firebase/database";


const firebaseapikey =process.env.NEXT_PUBLIC_FIREBASE_API_KEY 
const authDomainKey = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
const projectIdenv = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const firebaseConfig = {
  apiKey: firebaseapikey,
  authDomain:authDomainKey ,
  projectId: projectIdenv,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSANGER_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const fireAuth = getAuth(app);
export const fireFireStore = getFirestore(app);
export const fireRealtime = getDatabase(app)