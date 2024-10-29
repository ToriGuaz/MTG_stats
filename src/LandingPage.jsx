import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { ref, set, onValue } from 'firebase/database';

const LandingPage = ({ onJoinGame }) => {
  const [nombre, setNombre] = useState('');
  const [nombrePartida, setNombrePartida] = useState('');
  const [games, setGames] = useState([]);

  useEffect(() => {
    const gamesRef = ref(db, 'games/');
    onValue(gamesRef, (snapshot) => {
      const data = snapshot.val();
      const gamesList = data ? Object.keys(data).map(key => ({ nombre: key, ...data[key] })) : [];
      setGames(gamesList);
    });
  }, []);

  const handleJoinGame = () => {
    if (nombre && nombrePartida) {
      localStorage.setItem('nombreJugador', nombre); // Guardar en localStorage
      onJoinGame(nombre, nombrePartida);
    }
  };

  const handleCreateGame = () => {
    if (nombre && nombrePartida) {
      set(ref(db, `games/${nombrePartida}`), {
        jugadores: {
          [nombre]: { nombre, vida: 40 },
        },
      });
      localStorage.setItem('nombreJugador', nombre); // Guardar en localStorage
      onJoinGame(nombre, nombrePartida);
    }
  };

  return (
    <div>
      <h1>Magic: The Gathering - Contador de Vidas</h1>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Ingresa tu nombre"
      />
      <input
        type="text"
        value={nombrePartida}
        onChange={(e) => setNombrePartida(e.target.value)}
        placeholder="Ingresa el nombre de la partida"
      />
      <button onClick={handleCreateGame}>Crear Partida</button>
      <button onClick={handleJoinGame}>Unirse a Partida</button>
    </div>
  );
};

export default LandingPage;
