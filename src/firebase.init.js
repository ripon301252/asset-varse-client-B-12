// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2bKOyZZ_Np3SxImRDI8mNpw22MDIghFY",
  authDomain: "asset-verse-7a25f.firebaseapp.com",
  projectId: "asset-verse-7a25f",
  storageBucket: "asset-verse-7a25f.firebasestorage.app",
  messagingSenderId: "707940279284",
  appId: "1:707940279284:web:6ed26a2a878dbf034f0fa1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);