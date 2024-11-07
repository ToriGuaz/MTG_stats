import React, { useState, useEffect, useRef } from 'react';
import { ref, push, set, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';
import GameForm from './GameForm';

function LandingPage({ onGameSelect }) {
  const [inputGameName, setGameName] = useState('');
  const [inputPlayerName, setPlayerName] = useState('');
  const [games, setGames] = useState([]); // para actualizar el estado visualmente si es necesario
  const gameArray = useRef([]); // useRef para mantener el array actualizado sin que se reinicie

  useEffect(() => {
    const gamesRef = ref(db, 'games');

    onValue(gamesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const gameList = Object.keys(data).map((id) => ({
          id,
          gameName: data[id].gameName,
        }));
        gameArray.current = gameList; // actualiza la referencia
        setGames(gameList); // actualiza el estado si es necesario mostrarlo en pantalla
      }
    });
  }, []);

  const createGame = async () => {
    const namesArray = gameArray.current.map(game => game.gameName); // usa el array actualizado con useRef

    if (namesArray.includes(inputGameName)) {
      return alert("Error: partida ya existente MAMERTO"); // alerta si el nombre ya existe
    } else {
      const newGameRef = push(ref(db, 'games'));
      set(newGameRef, { 
        gameName: inputGameName,
        players: [
          {
            PlayerName: inputPlayerName,
            life: 40,
            counter: 0,
          },
        ],
      })
      .then(() => {
        alert("Partida creada");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
    }
  };

  return (
    <div>
      <p>Únete a una partida o crea una nueva</p>
      <input
        type="text"
        placeholder="Nombre de jugador"
        value={inputPlayerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <GameForm onGameSelect={onGameSelect} />
      <input
        type="text"
        placeholder="crear partida"
        value={inputGameName}
        onChange={(e) => setGameName(e.target.value)}
      />
      <button onClick={createGame}>Crear partida</button>
    </div>
  );
}

export default LandingPage;

