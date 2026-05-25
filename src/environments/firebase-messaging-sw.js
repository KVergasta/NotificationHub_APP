// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-IGwzIqCC2mpXJxxCCjhw4eVkzNdIXog",
  authDomain: "notificationhub-d9fb5.firebaseapp.com",
  projectId: "notificationhub-d9fb5",
  storageBucket: "notificationhub-d9fb5.firebasestorage.app",
  messagingSenderId: "791895927795",
  appId: "1:791895927795:web:0f76812b85b5d9709fc086",
  measurementId: "G-V1Y7QH4S3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);