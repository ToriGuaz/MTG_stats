import React, { useState, useEffect, useRef } from 'react';
import { ref, push, set, onValue, update } from 'firebase/database';
import { db } from '../firebaseConfig';
import GameForm from './GameForm';

function LandingPage({ onGameSelect }) {
  const [inputGameName, setGameName] = useState('');
  const [inputPlayerName, setPlayerName] = useState('');
  const [games, setGames] = useState([]);
  const gameArray = useRef([]);

  useEffect(() => {
    const gamesRef = ref(db, 'games');

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

  const handleGameSelect = (gameID, playerID) => {
    const gameRef = ref(db, `games/${gameID}/players/${playerID}`);

    onValue(gameRef, (snapshot) => {
        if (!snapshot.exists()) {
            set(gameRef, {
                playerName: inputPlayerName,
                life: 40,
                counter: 0,
            })
            .then(() => {
                alert("Jugador añadido a la partida existente");
            })
            .catch((error) => {
                console.error("Error al añadir jugador:", error);
            });
        } else {
            onGameSelect(gameID);
        }
    });
  };

  const createGame = async () => {
    const namesArray = gameArray.current.map(game => game.gameName);

    if (namesArray.includes(inputGameName)) {
      return alert("Error: partida ya existente MAMERTO");
    } else {
      const playerID = localStorage.getItem('playerID') || push(ref(db, 'games')).key; 
      localStorage.setItem('playerID', playerID); 
      
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
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
    }
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
      <GameForm onGameSelect={handleGameSelect} />
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
