// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth" 
import {getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0laPzHTkrVRfZPMLZw7U9oNxZWJihIAo",
  authDomain: "serviceproviderapp-705f1.firebaseapp.com",
  projectId: "serviceproviderapp-705f1",
  storageBucket: "serviceproviderapp-705f1.firebasestorage.app",
  messagingSenderId: "246421265667",
  appId: "1:246421265667:web:c1aff468f0700216255d36",
  measurementId: "G-D4Q2QMSN8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {auth,db,storage}