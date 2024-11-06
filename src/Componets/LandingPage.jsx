import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, child, push, set, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';
import GameForm from './GameForm';

function LandingPage({ onGameSelect }) {
  const [inputGameName, setGameName] = useState('');
  const [inputPlayerName, setPlayerName] = useState('');
  const [games, setGames] = useState([]);


  const createGame  = async () => {
    const newGameRef = push(ref(db, 'games'));
    const gameId = newGameRef.key;
    set(newGameRef, { 
      gameName: inputGameName,
      players: [
        {PlayerName: inputPlayerName,
          life: 40,
          counter: 0
        }]
    }).then(() => {
      alert("data saved")}).catch((error) => {
        alert("Error: " + error.message);
      })
  }    
  

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
        //crear partida nueva
        type="text"
        placeholder="crear partida"
        value={inputGameName}
        onChange={(e) => setGameName(e.target.value)}
      />
      <button onClick={createGame}>Crear partida</button>
    </div>
  );
};

export default LandingPage;
