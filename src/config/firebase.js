// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-dHIGInlAte1FxZIVEitwwWTKrc3OALo",
    authDomain: "minyanmanapp.firebaseapp.com",
    projectId: "minyanmanapp",
    storageBucket: "minyanmanapp.firebasestorage.app",
    messagingSenderId: "143401006977",
    appId: "1:143401006977:web:a12a49716dc6818496da80",
    measurementId: "G-TJHER8HHXH"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };