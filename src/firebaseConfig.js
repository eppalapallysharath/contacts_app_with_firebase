import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAF8i9R3-kFdTiPPhwX_JlxRTc1A_LXCQc",
  authDomain: "ecommerce-d15a4.firebaseapp.com",
  projectId: "ecommerce-d15a4",
  storageBucket: "ecommerce-d15a4.firebasestorage.app",
  messagingSenderId: "678212109497",
  appId: "1:678212109497:web:4274af4bddde6d412f0768",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
