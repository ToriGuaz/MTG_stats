import React, { useState } from 'react';
import { ref, push, update, onValue } from 'firebase/database';
import { db } from './firebaseConfig';

const LandingPage = ({ setGameID }) => {
  const [inputGameID, setInputGameID] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleGameIDChange = (e) => {
    setInputGameID(e.target.value);
  };

  const handlePlayerNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const onJoinGame = () => {
    if (!playerName) {
      alert('Por favor, ingresa un nombre.');
      return;
    }

    if (inputGameID) {
      // Unirse a una partida existente
      setGameID(inputGameID);
      localStorage.setItem('userID', playerName);
    } else {
      // Crear una nueva partida
      const newGameRef = push(ref(db, 'games'));
      const newGameID = newGameRef.key;

      // Inicializa la partida con el jugador actual
      update(newGameRef, { 
        players: { 
          [playerName]: { id: playerName }
        }
      });

      setGameID(newGameID);
      localStorage.setItem('userID', playerName);
    }
  };

  return (
    <div>
      <h2>Únete a una partida o crea una nueva</h2>
      <input
        type="text"
        placeholder="Nombre de jugador"
        value={playerName}
        onChange={handlePlayerNameChange}
      />
      <input
        type="text"
        placeholder="ID de partida (opcional)"
        value={inputGameID}
        onChange={handleGameIDChange}
      />
      <button onClick={onJoinGame}>Ingresar a la partida</button>
    </div>
  );
};

export default LandingPage;
