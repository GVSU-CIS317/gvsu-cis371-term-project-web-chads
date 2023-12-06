import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsChQ3FPJvgPMSB9KlYhzc-QV-dsKsyJ8",
  authDomain: "webchads.firebaseapp.com",
  projectId: "webchads",
  storageBucket: "webchads.appspot.com",
  messagingSenderId: "412883406742",
  appId: "1:412883406742:web:98c001a918f9b4073817b7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
