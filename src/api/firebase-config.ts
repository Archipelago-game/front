import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBzogfY8g4_WKwtfTGFJW4_YC7uHIP43w",
  authDomain: "archipelago-475215.firebaseapp.com",
  projectId: "archipelago-475215",
  storageBucket: "archipelago-475215.firebasestorage.app",
  messagingSenderId: "75105588849",
  appId: "1:75105588849:web:e33cac3f424a494f782dd0",
  measurementId: "G-B9LJSCML5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

export default app;
