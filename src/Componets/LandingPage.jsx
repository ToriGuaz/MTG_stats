import React, { useState, useEffect, useRef } from 'react';
import { ref, push, set, onValue, remove } from 'firebase/database';
import { db } from '../firebaseConfig';


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
    
    const savedPlayerName = localStorage.getItem('playerName');
    if (savedPlayerName) setPlayerName(savedPlayerName);
    
  }, []);

  const removePlayerFromPreviousGame = () => {
    const previousGameID = localStorage.getItem('gameID');
    const playerID = localStorage.getItem('playerID');
    
    if (previousGameID && playerID) {
      const playerRef = ref(db, `games/${previousGameID}/players/${playerID}`);
      remove(playerRef)
        .then(() => {
          console.log("Jugador eliminado de la partida anterior");

          const gameRef = ref(db, `games/${previousGameID}/players`);
          onValue(gameRef, (snapshot) => {
            const players = snapshot.val();
            if (!players || Object.keys(players).length === 0) {
              remove(ref(db, `games/${previousGameID}`))
                .then(() => console.log("Partida eliminada"))
                .catch((error) => console.error("Error al eliminar partida:", error));
            }
          });
        })
        .catch((error) => console.error("Error al eliminar jugador:", error));
    }
  };

  const handleGameSelect = (gameID) => {
    if (!inputPlayerName) {
      return alert("Error: Por favor ingresa un nombre de jugador.");
    }
    if (gameID !== localStorage.getItem('gameID')) {
      removePlayerFromPreviousGame();
    }
    const playerID = localStorage.getItem('playerID') || push(ref(db, 'games')).key;
    localStorage.setItem('playerID', playerID);
    localStorage.setItem('playerName', inputPlayerName);
    localStorage.setItem('gameID', gameID);

    const gameRef = ref(db, `games/${gameID}/players/${playerID}`);

    set(gameRef, {
      playerName: inputPlayerName,
      life: 40,
      mana: {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        x: 0,
      },
    })
      .then(() => {
        alert("Jugador añadido a la partida existente");
        onGameSelect(gameID);
      })
      .catch((error) => {
        console.error("Error al añadir jugador:", error);
      });
  };

  const createGame = () => {
    if (!inputPlayerName) {
      return alert("Error: Por favor ingresa un nombre de jugador.");
    }
    const namesArray = gameArray.current.map(game => game.gameName);

    if (!inputGameName) {
      return alert("Error: Por favor ingresa un nombre de partida.");
    }
    if (namesArray.includes(inputGameName)) {
      return alert("Error: partida ya existente");
    } else {
      removePlayerFromPreviousGame();

      const playerID = localStorage.getItem('playerID') || push(ref(db, 'games')).key;
      localStorage.setItem('playerID', playerID);
      localStorage.setItem('playerName', inputPlayerName);

      const newGameRef = push(ref(db, 'games'));
      const newGameID = newGameRef.key;
      localStorage.setItem('gameID', newGameID);

      set(newGameRef, {
        gameName: inputGameName,
        players: {
          [playerID]: {
            playerName: inputPlayerName,
            life: 40,
            mana: {
              a: 0,
              b: 0,
              c: 0,
              d: 0,
              e: 0,
              x: 0,
            },
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
    <div className="landingPage">
      

      <label>Únete a una partida o crea una nueva</label>
      <input
        className='input'
        type="text"
        placeholder="Nombre de jugador"
        value={inputPlayerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <div>
        <label htmlFor="gameSelect">Elige un juego ya creado: </label>
        <select className='select' id="gameSelect" onChange={(e) => handleGameSelect(e.target.value)}>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.gameName}
            </option>
          ))}
        </select>
      </div>

      <input
        className='input'
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

