// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN1OKQ0YJ7CJOm4nO-pg9pk9dprWUM5N0",
  authDomain: "unipia-dd7c2.firebaseapp.com",
  projectId: "unipia-dd7c2",
  storageBucket: "unipia-dd7c2.firebasestorage.app",
  messagingSenderId: "988878522649",
  appId: "1:988878522649:web:4279604bfc825a1fa3dd88",
  measurementId: "G-9WQ6QENB1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);