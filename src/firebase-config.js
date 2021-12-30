import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC9vx1Va6PUIS85gE4Dr2p_zrQwWAirZ88",
  authDomain: "first-project-9a37c.firebaseapp.com",
  projectId: "first-project-9a37c",
  storageBucket: "first-project-9a37c.appspot.com",
  messagingSenderId: "741500200827",
  appId: "1:741500200827:web:ba20abd38f0fa18d35bfde",
  measurementId: "G-65BB5WP5DJ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
