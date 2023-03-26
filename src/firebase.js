// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1qAOKDIZGwZaU8oj3fcLRLfhNHquHNtg",
  authDomain: "react-disney-plus-app-79991.firebaseapp.com",
  projectId: "react-disney-plus-app-79991",
  storageBucket: "react-disney-plus-app-79991.appspot.com",
  messagingSenderId: "375896005241",
  appId: "1:375896005241:web:0341b762ebb95edba252a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;