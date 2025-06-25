// src/auth/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDkpwNckAT7x0MAu5JfjzTa1ijcXEQma-Q",
  authDomain: "inventory-dashboard-ba6c7.firebaseapp.com",
  projectId: "inventory-dashboard-ba6c7",
  storageBucket: "inventory-dashboard-ba6c7.appspot.com",
  messagingSenderId: "291116971875",
  appId: "1:291116971875:web:0375c1be80479177898556",
  measurementId: "G-733FM690FW"
};

// Initialize and export the Firebase App
export const app = initializeApp(firebaseConfig);

// Export Auth and Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
