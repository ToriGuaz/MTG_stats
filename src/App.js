import React, { useState } from 'react';
import './App.css';
import LandingPage from './LandingPage';
import Usuario from './Usuario';
import Oponente from './Oponente';

function App() {
  const [gameData, setGameData] = useState(null); // Para almacenar la información del juego
  const [nombreJugador, setNombreJugador] = useState('');

  const handleJoinGame = (nombre, nombrePartida) => {
    setNombreJugador(nombre);
    setGameData({ nombrePartida, nombreJugador }); // Aquí podrías almacenar más información si es necesario
  };

  return (
    <div className="App">
      <header className="App-header">
        {gameData ? (
          <div>
            <Usuario nombre={nombreJugador} />
            <Oponente oponenteId="jugador2" /> {/* Cambia esto según tu lógica */}
          </div>
        ) : (
          <LandingPage onJoinGame={handleJoinGame} />
        )}
      </header>
    </div>
  );
}

export default App;
