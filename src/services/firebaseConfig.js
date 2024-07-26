
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPsKEERRHvVtkNdJPKLmDuT1aG8thMzT8",
  authDomain: "barbearia-3a80d.firebaseapp.com",
  projectId: "barbearia-3a80d",
  storageBucket: "barbearia-3a80d.appspot.com",
  messagingSenderId: "277473694156",
  appId: "1:277473694156:web:0182d18badee49ef06cd69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)