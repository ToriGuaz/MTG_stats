import React, { useState, useEffect } from 'react';
import { ref, get, getDatabase, child } from 'firebase/database';
import LandingPage from './Componets/LandingPage';
import Game from './Componets/Game';
import './Styles/app.css';

function App() {
  const [gameID, setGameID] = useState('');

  const handleSetGameID = (id) => {
    setGameID(id);
  };

  return (
    <div>
      <LandingPage  onGameSelect={handleSetGameID} />
      <Game  gameID={gameID} />
    </div>
  );
}

export default App;