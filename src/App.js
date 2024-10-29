import './App.css';
import React, { useEffect, useState } from 'react';
import { db, ref, push, remove, onValue, update } from './firebaseConfig';
import LandingPage from './LandingPage';
import Usuario from './Usuario';
import Oponente from './Oponente';

function App() {
  const [gameID, setGameID] = useState(null);
  const [opponents, setOpponents] = useState([]);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
      const gameRef = ref(db, `games/${gameID}/players`);

      // Agregar jugador a la partida usando update en lugar de set
      const playerRef = push(gameRef);
      update(playerRef, { id: userID });

      // Escuchar cambios en los jugadores de la partida
      onValue(gameRef, (snapshot) => {
          const players = snapshot.val();
          const playerList = players ? Object.values(players) : [];
          setOpponents(playerList.filter(id => id !== userID));
      });

      // Eliminar jugador al desconectarse
      return () => {
          remove(playerRef);
      };
  }, [gameID, userID]);

  return (
      <div className="App">
          <Usuario userID={userID} />
          {opponents.map(opponentID => (
              <Oponente key={opponentID} opponentID={opponentID} />
          ))}
      </div>
  );
}

export default App;
