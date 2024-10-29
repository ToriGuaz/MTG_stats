import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { ref, set, onValue } from 'firebase/database';
import DOMPurify from 'dompurify';

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

  // Función de sanitización y validación
  const handleNombreChange = (e) => {
    const value = e.target.value;
    const isValid = /^[a-zA-Z0-9\s]*$/.test(value); 

    if (isValid && value.length <= 20) {
      const sanitizedValue = DOMPurify.sanitize(value);
      setNombre(sanitizedValue);
    } else if (!isValid) {
      alert("Caracteres no válidos. Usa solo letras, números y espacios.");
    }
  };

  const handleNombrePartidaChange = (e) => {
    const value = e.target.value;
    const isValid = /^[a-zA-Z0-9\s]*$/.test(value); 

    if (isValid && value.length <= 20) {
      const sanitizedValue = DOMPurify.sanitize(value);
      setNombrePartida(sanitizedValue);
    } else if (!isValid) {
      alert("Caracteres no válidos. Usa solo letras, números y espacios.");
    }
  };

  return (
    <div>
      <h1>Magic: The Gathering - Contador de Vidas</h1>
      <input
        type="text"
        value={nombre}
        onChange={handleNombreChange} 
        placeholder="Ingresa tu nombre"
        maxLength={20} 
      />
      <input
        type="text"
        value={nombrePartida}
        onChange={handleNombrePartidaChange} 
        placeholder="Ingresa el nombre de la partida"
        maxLength={10} 
      />
      <button onClick={handleCreateGame}>Crear Partida</button>
      <button onClick={handleJoinGame}>Unirse a Partida</button>
    </div>
  );
};

export default LandingPage;
