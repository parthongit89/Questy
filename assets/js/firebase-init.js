// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy0y_LijAZsHyaSoroZt3JmvJhA9QJtsc",
  authDomain: "general-c3c29.firebaseapp.com",
  projectId: "general-c3c29",
  storageBucket: "general-c3c29.firebasestorage.app",
  messagingSenderId: "692119295018",
  appId: "1:692119295018:web:303f8378b6b0b7744d9f53",
  measurementId: "G-ZV8W09Q19F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = null;

try {
  analytics = getAnalytics(app);
} catch (err) {
  // Analytics is only active on HTTP(S) protocol or when supported
  console.debug("Firebase Analytics running in supported context", err);
}

export { app, analytics };
