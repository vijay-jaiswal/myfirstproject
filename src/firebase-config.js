// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9vx1Va6PUIS85gE4Dr2p_zrQwWAirZ88",
  authDomain: "first-project-9a37c.firebaseapp.com",
  projectId: "first-project-9a37c",
  storageBucket: "first-project-9a37c.appspot.com",
  messagingSenderId: "741500200827",
  appId: "1:741500200827:web:ba20abd38f0fa18d35bfde",
  measurementId: "G-65BB5WP5DJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);

// const analytics = getAnalytics(app);