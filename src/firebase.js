// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1ExQ8egDsVhDWEf4USa7zAIvk8EoruQw",
  authDomain: "chef-a-ton-da920.firebaseapp.com",
  projectId: "chef-a-ton-da920",
  storageBucket: "chef-a-ton-da920.firebasestorage.app",
  messagingSenderId: "655136236485",
  appId: "1:655136236485:web:821ce36972cb5291a921ac",
  measurementId: "G-8XWQ4LNWJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const db = getFirestore(app);
export {app, provider, db}


