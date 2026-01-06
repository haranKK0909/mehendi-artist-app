import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDAfibG42cuCVyOEP8tl-RNNMXA5jqjJXI",
  authDomain: "mehendi-artist-300a7.firebaseapp.com",
  projectId: "mehendi-artist-300a7",
  storageBucket: "mehendi-artist-300a7.firebasestorage.app",
  messagingSenderId: "66830064510",
  appId: "1:66830064510:web:d21ad277abc8fe166cb12f",
  measurementId: "G-1MG6PQPWN1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);