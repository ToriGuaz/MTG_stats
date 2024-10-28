import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBTzfDF8Hqxob52odaaoyUmTOhbu54jbIY",
  authDomain: "mtgstats-864da.firebaseapp.com",
  databaseURL: "https://mtgstats-864da-default-rtdb.firebaseio.com",
  projectId: "mtgstats-864da",
  storageBucket: "mtgstats-864da.appspot.com",
  messagingSenderId: "68211953531",
  appId: "1:68211953531:web:3619c6cc482a2bfeeb77de",
  measurementId: "G-78HCZP9LD6"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);

export { app, db };