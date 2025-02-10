import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTqvLXbxZKPTOr1noEvUqXPA0ndDnit4s",
  authDomain: "greenplore-b84fc.firebaseapp.com",
  projectId: "greenplore-b84fc",
  storageBucket: "greenplore-b84fc.firebasestorage.app",
  messagingSenderId: "887775184477",
  appId: "1:887775184477:web:2a1494826dd5b2019f6fb4",
  measurementId: "G-BLGHB3BX1D",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider, signInWithPopup };
