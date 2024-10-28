import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { ref, set, onValue } from 'firebase/database';

const LandingPage = ({ onJoinGame }) => {
  const [nombre, setNombre] = useState('');
  const [nombrePartida, setNombrePartida] = useState('');
  const [games, setGames] = useState([]);

  // Cargar partidas existentes
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
      // Aquí puedes manejar la lógica para unirse a un juego
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
      onJoinGame(nombre, nombrePartida);
    }
  };

  return (
    <div>
      <h1>Magic: The Gathering - Landing Page</h1>
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

      <h2>Unirse a una Partida Existente</h2>
      <button onClick={handleJoinGame}>Unirse</button>

      <h2>Partidas Existentes</h2>
      <ul>
        {games.map((game) => (
          <li key={game.nombre}>
            {game.nombre} - {game.jugadores ? Object.keys(game.jugadores).join(', ') : 'No hay jugadores'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LandingPage;
