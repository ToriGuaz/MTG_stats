import React, { useState, useEffect } from 'react';
import { ref, get, getDatabase, child } from 'firebase/database';
//import { db } from './firebaseConfig';
//import Usuario from './Usuario';
//import Oponente from './Oponente';
import LandingPage from './LandingPage';
import GameForm from './GameForm';

function App() {
  const [gameName, setGameName] = useState(null);
  const [gameID, setGameID] = useState([]);
  let [players, setPlayers] = useState([]);

  const handleSetGameID = (id) => {
    setGameID(id);
  };

  useEffect(() => {
    if (gameID) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `games/${gameID}/players`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setPlayers(Object.values(snapshot.val()));
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [gameID]);


  return (
    <div >
      <LandingPage onGameSelect={handleSetGameID} />
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
