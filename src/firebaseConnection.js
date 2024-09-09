// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/auth';

import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: "AIzaSyBdUqLKQBQeROOr15cWZWbv9v1nMrhM6HI",
  authDomain: "gppex-90ce6.firebaseapp.com",
  projectId: "gppex-90ce6",
  storageBucket: "gppex-90ce6.appspot.com",
  messagingSenderId: "766235092942",
  appId: "1:766235092942:web:877cb6f3d5742f9dbd6d9f",
  measurementId: "G-DEXENKK9J8"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
