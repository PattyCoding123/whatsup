import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdqMko7BVDvTokPg-WWkNtWQbq0GPENHk",
  authDomain: "whatsup-e290f.firebaseapp.com",
  projectId: "whatsup-e290f",
  storageBucket: "whatsup-e290f.appspot.com",
  messagingSenderId: "129535299409",
  appId: "1:129535299409:web:14c0a40279e84166f00d70",
  measurementId: "G-HCHCDK4576"
};


// Initialize a new Firebase app instance if there were no 
// previous instances.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Access the app's Firestore instance.
const db = getFirestore(app);

// Access the app's authentication instance.
const auth = getAuth(app);

// Create a new GoogleAuthProvider instance.
const provider = new GoogleAuthProvider();

// Export the db, auth, and provider.
export { db, auth, provider };