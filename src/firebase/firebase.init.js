// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCZ4sQuKpZEEUqvazcuGSWOM8KHL7xEpw",
  authDomain: "simple-first-firebase-6c607.firebaseapp.com",
  projectId: "simple-first-firebase-6c607",
  storageBucket: "simple-first-firebase-6c607.appspot.com",
  messagingSenderId: "1014126799146",
  appId: "1:1014126799146:web:c96a9a00b8f809985c5653"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;