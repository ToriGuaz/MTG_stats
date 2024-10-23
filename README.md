MTG STATS

web contador de stats de mtg donde incluya:
Vidas
Contador de veneno
etc

PascalCase para nombres de componentes y camelCase para nombres de variables

para deployar, una vez pushado escribir comando: 
npm run build
npm run deploy

si lo queres ver en tu pc antes de deployarlo solo escribir:
npm start

https://app.diagrams.net/?mode=google#G1hwXSY0qRPoFtTNKK46L8FBut0fkGwJR9#%7B%22pageId%22%3A%22c4acf3e9-155e-7222-9cf6-157b1a14988f%22%7D

https://www.pivotaltracker.com/n/projects/2722445




ESTO AVERIGUE HASTA AHORA, CASI ME MUERO, ROMPI TODO Y CREO QUE LO ARREGLE
crear en src una carpeta llamada firebaseConfig y dentro un archivo firebase.js y copiar:
--------------------------------------------------------------------
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "ACA VA EL API KEY",
  authDomain: "mtgstats-864da.firebaseapp.com",
  projectId: "mtgstats-864da",
  storageBucket: "mtgstats-864da.appspot.com",
  messagingSenderId: "68211953531",
  appId: "NO SE SI ESTO ERA PEGRILOSO TAMBIEN"  - TODO ESTO ESTA EN CONFIGRACION DE FIREBASE
  measurementId: "G-78HCZP9LD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

esport const db = getFirestore(app)
-----------------------------------------------------------------------

en los componentes importar:
import { Link } from 'react-router-dom'
import { collection, getDocts, getDoc, deleteDoc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase

y dentro de la funcion escribir:

const vidaCollection = collection(db, "vida")

const getVida = async () => {
	const data = await getDocs(vidaCollection)
	//esto despues se envia a donde corresponda:
	console.log(data.vida)
}


useEffect( () => {
	getVida()
})
// aca habia un array asi que no estoy segura que funcione asi



***para firebase use este tutorial:  https://www.youtube.com/watch?v=LpC2EEIhu-g