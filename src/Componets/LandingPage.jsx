import React, { useState, useEffect, useRef } from 'react';
import { ref, push, set, onValue, update } from 'firebase/database';
import { db } from '../firebaseConfig';

function LandingPage({ onGameSelect }) {
  const [inputGameName, setGameName] = useState('');
  const [inputPlayerName, setPlayerName] = useState('');
  const [games, setGames] = useState([]);
  const gameArray = useRef([]);

  useEffect(() => {
    const gamesRef = ref(db, 'games');
    const storedPlayerName = localStorage.getItem('playerName');
    
    if (storedPlayerName) {
      setPlayerName(storedPlayerName); // Autocompleta el nombre del jugador si existe en localStorage
    }

    onValue(gamesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const gameList = Object.keys(data).map((id) => ({
          id,
          gameName: data[id].gameName,
        }));
        gameArray.current = gameList;
        setGames(gameList);
      }
    });
  }, []);

  const handleGameSelect = (gameID) => {
    if (!inputPlayerName) {
      alert("Por favor, ingresa un nombre de jugador antes de unirte a una partida.");
      return;
    }

    const playerID = localStorage.getItem('playerID') || push(ref(db, 'games')).key;
    localStorage.setItem('playerID', playerID);
    localStorage.setItem('playerName', inputPlayerName); // Guarda el nombre actualizado en localStorage

    const gameRef = ref(db, `games/${gameID}/players/${playerID}`);

    onValue(gameRef, (snapshot) => {
      if (!snapshot.exists()) {
        set(gameRef, {
          playerName: inputPlayerName,
          life: 40,
          counter: 0,
        })
        .then(() => alert("Jugador añadido a la partida existente"))
        .catch((error) => console.error("Error al añadir jugador:", error));
      }
      onGameSelect(gameID);
    });
  };

  const createGame = () => {
    if (!inputPlayerName) {
      alert("Por favor, ingresa un nombre de jugador antes de crear una partida.");
      return;
    }

    const namesArray = gameArray.current.map(game => game.gameName);
    if (namesArray.includes(inputGameName)) {
      alert("Error: partida ya existente MAMERTO");
      return;
    }

    const playerID = localStorage.getItem('playerID') || push(ref(db, 'games')).key;
    localStorage.setItem('playerID', playerID);
    localStorage.setItem('playerName', inputPlayerName); // Guarda el nombre actualizado en localStorage

    const newGameRef = push(ref(db, 'games'));
    const newGameID = newGameRef.key;

    set(newGameRef, {
      gameName: inputGameName,
      players: {
        [playerID]: {
          playerName: inputPlayerName,
          life: 40,
          counter: 0,
        },
      },
    })
    .then(() => {
      alert("Partida creada");
      onGameSelect(newGameID);
      localStorage.setItem('gameID', newGameID);
    })
    .catch((error) => alert("Error: " + error.message));
  };

  return (
    <div className="header">
      <p>Únete a una partida o crea una nueva</p>

      <input
        type="text"
        placeholder="Nombre de jugador"
        value={inputPlayerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <div>
        <label htmlFor="gameSelect">Elige un juego ya creado: </label>
        <select id="gameSelect" onChange={(e) => handleGameSelect(e.target.value)}>
          <option value="">Seleccione una partida</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.gameName}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="Crear partida"
        value={inputGameName}
        onChange={(e) => setGameName(e.target.value)}
      />
      <button onClick={createGame}>Crear partida</button>
    </div>
  );
}

export default LandingPage;
