// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaKIPRPCnSAjndP9m7ObsdBjMwYB7GJ20",
  authDomain: "chef-a-ton.firebaseapp.com",
  projectId: "chef-a-ton",
  storageBucket: "chef-a-ton.firebasestorage.app",
  messagingSenderId: "668548791730",
  appId: "1:668548791730:web:cb7e48cb5a2809dc2938ab",
  measurementId: "G-248LS6EHVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);