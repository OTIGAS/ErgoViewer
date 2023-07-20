import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBguaeOnC6D_t8CWEyPE5NSJSgsj1a1O-Q",
  authDomain: "ergoviewer-39ab7.firebaseapp.com",
  projectId: "ergoviewer-39ab7",
  storageBucket: "ergoviewer-39ab7.appspot.com",
  messagingSenderId: "1068222123049",
  appId: "1:1068222123049:web:6fa4435b647b7d694f6038",
  measurementId: "G-J5BW9DK4MX",
};

let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const provider = new EmailAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

export { db, provider, auth, storage };
