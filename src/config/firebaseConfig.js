// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjgNZCPO_AOPWO76o5sClTATpfNsO3mBw",
  authDomain: "testimonials-db.firebaseapp.com",
  projectId: "testimonials-db",
  storageBucket: "testimonials-db.appspot.com",
  messagingSenderId: "105283987715",
  appId: "1:105283987715:web:ed21cafb74fe80ccaaa136",
  measurementId: "G-S37WNZR1BL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);