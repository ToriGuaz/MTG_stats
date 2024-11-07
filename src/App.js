import React, { useState, useEffect } from 'react';
import { ref, get, getDatabase, child } from 'firebase/database';
//import { db } from './firebaseConfig';
//import Usuario from './Usuario';
//import Oponente from './Oponente';
import LandingPage from './Componets/LandingPage';
//import GameForm from './Componets/GameForm';

function App() {
  const [gameName, setGameName] = useState('');
  const [gameID, setGameID] = useState('');
  const [players, setPlayers] = useState([]);

  const handleSetGameID = (id) => {
    setGameID(id);
  };

  useEffect(() => {
    if (gameID) {
      const dbRef = ref(getDatabase());


      get(child(dbRef, `games/${gameID}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setGameName(data.gameName); // Establece el nombre del juego
            
            // Verificar si `players` existe en los datos antes de usar `Object.values`
            if (data.players) {
              setPlayers(Object.values(data.players)); // Establece los jugadores
            } else {
              setPlayers([]); // Si no hay jugadores, establece un array vacío
            }
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
    <div>
      <LandingPage onGameSelect={handleSetGameID} />
      <h2>Partida: {gameName}</h2>
      <ul>
        {players.map((item, index) => (
          <li key={index}>
            {item.playerName}: {item.life}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;