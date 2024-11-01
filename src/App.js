import React, { useState, useEffect } from 'react';
import { ref, push, update, onValue, remove } from 'firebase/database';
import { db } from './firebaseConfig';
import Usuario from './Usuario';
import Oponente from './Oponente';
import LandingPage from './LandingPage';

function App() {
  const [gameID, setGameID] = useState(null);
  const [opponents, setOpponents] = useState([]);
  const userID = localStorage.getItem('userID');

  // Función para establecer el ID de la partida desde la LandingPage
  const handleSetGameID = (id) => {
    setGameID(id);
  };

  useEffect(() => {
    if (!gameID) return;

    const gameRef = ref(db, `games/${gameID}/players`);

    // Agregar jugador a la partida usando `update` en lugar de `set`
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

  // Condicional para mostrar `LandingPage` si no hay `gameID`
  if (!gameID) {
    return <LandingPage setGameID={handleSetGameID} />;
  }

  return (
    <div >
      {gameID ? (
        <>
          <Usuario userID={userID} />
          {opponents.length > 0 ? (
            opponents.map(opponentID => (
              <Oponente key={Oponente.id} opponentID={Oponente.id} />
            ))
          ) : (
            <p>Esperando a que se una un oponente...</p>
          )}
        </>
      ) : (
        <LandingPage onJoinGame={setGameID} />
      )}
    </div>
  );
}

export default App;
