// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import dotenv from "dotenv";

dotenv.config();
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API,
  authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase app is already initialized to avoid duplicates
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
