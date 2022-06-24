// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVZS9KMYpKZHNs8-vnp1XKqMHe-VcZEUI",
  authDomain: "sellitems-68723.firebaseapp.com",
  projectId: "sellitems-68723",
  storageBucket: "sellitems-68723.appspot.com",
  messagingSenderId: "61769880647",
  appId: "1:61769880647:web:527f74b579a410c0384d62",
  measurementId: "G-0BMJ5KE0SE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getFirestore();
