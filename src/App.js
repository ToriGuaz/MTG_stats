import React, { useState } from 'react';
import { ref, get, getDatabase, child } from 'firebase/database';
//import { db } from './firebaseConfig';
//import Usuario from './Usuario';
//import Oponente from './Oponente';
import LandingPage from './LandingPage';

function App() {
  const [gameName, setGameName] = useState(null);
  let [players, setPlayers] = useState([]);

  const dbRef = ref(getDatabase());
  get(child(dbRef, `games/-OAuFYUnII3Uv0SvvIlH/players`)).then((snapshot) => {
    if (snapshot.exists()) {
      setPlayers(Object.values(snapshot.val()));
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });


  return (
    <div >
      <LandingPage createGame={ setGameName }/>
      <ul>
        {players.map((item, index) => (
          <li key={index}>
            {item.PlayerName}: {item.life} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
