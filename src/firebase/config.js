
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore,serverTimestamp} from 'firebase/firestore'
import {getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBidlEjxNDsL1PgCNxxNxZ81VUugJ1SjRI",
  authDomain: "travel-blog-d3700.firebaseapp.com",
  projectId: "travel-blog-d3700",
  storageBucket: "travel-blog-d3700.appspot.com",
  messagingSenderId: "941357691251",
  appId: "1:941357691251:web:f865e20d863b91c6d35506"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const timeStamp = serverTimestamp(db)