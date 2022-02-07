// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe64LnBBZVb71gQch8Wv1GUK74RJ2vn8s",
  authDomain: "whats-app-745d4.firebaseapp.com",
  projectId: "whats-app-745d4",
  storageBucket: "whats-app-745d4.appspot.com",
  messagingSenderId: "334734556931",
  appId: "1:334734556931:web:1f94495ef23e5d38663336",
  measurementId: "G-E13L9FQFNR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const provider = new GoogleAuthProvider()
export {db, provider}