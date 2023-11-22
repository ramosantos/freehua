import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth';

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDZe5Afwd4IF8O0sjGx8UBlJprasm20-Qk',
  authDomain: 'freehua-db.firebaseapp.com',
  projectId: 'freehua-db',
  storageBucket: 'freehua-db.appspot.com',
  messagingSenderId: '912869104324',
  appId: '1:912869104324:web:867e8d751670c004fb0791',
  measurementId: 'G-S0D7E23XXE',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP, {persistence: getReactNativePersistence(EncryptedStorage)});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
