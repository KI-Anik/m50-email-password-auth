// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs_ADNhs-0yTaLekrEgxwDMhm2jwUc0GQ",
  authDomain: "m50-email-password-auth.firebaseapp.com",
  projectId: "m50-email-password-auth",
  storageBucket: "m50-email-password-auth.firebasestorage.app",
  messagingSenderId: "537101560168",
  appId: "1:537101560168:web:a2c91c8af1edec95764edd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth