// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACiHgW7u6KDTT5C6-3esEMK8woaApWpVk",
  authDomain: "visitpost-d8747.firebaseapp.com",
  projectId: "visitpost-d8747",
  storageBucket: "visitpost-d8747.appspot.com",
  messagingSenderId: "817311275010",
  appId: "1:817311275010:web:f772cd4cc161b2cf11ef1b",
  measurementId: "G-GDQQ6TPQMQ",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
