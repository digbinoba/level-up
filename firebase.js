// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6dneeLEsmM8PJ_oEfMndQKFH5YxSFza4",
  authDomain: "level-up-9f26d.firebaseapp.com",
  projectId: "level-up-9f26d",
  storageBucket: "level-up-9f26d.appspot.com",
  messagingSenderId: "1029514800205",
  appId: "1:1029514800205:web:b5e853f7fd058cd5094004",
  measurementId: "G-88K6B311FR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export { auth, db } 
