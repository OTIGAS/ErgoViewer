import { initializeApp } from 'firebase/app';

import { GoogleAuthProvider } from "firebase/auth";

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBguaeOnC6D_t8CWEyPE5NSJSgsj1a1O-Q',
  authDomain: 'ergoviewer-39ab7.firebaseapp.com',
  projectId: 'ergoviewer-39ab7',
  storageBucket: 'ergoviewer-39ab7.appspot.com',
  messagingSenderId: '1068222123049',
  appId: '1:1068222123049:web:6fa4435b647b7d694f6038',
  measurementId: 'G-J5BW9DK4MX',
};

const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
