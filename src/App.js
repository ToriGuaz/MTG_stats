import React, { useState } from 'react';
import LandingPage from './Componets/LandingPage';
import Game from './Componets/Game';
import './Styles/app.css';

function App() {
  const [gameID, setGameID] = useState('');
  const [isLandingPageVisible, setIsLandingPageVisible] = useState(false);

  const handleSetGameID = (id) => {
    setGameID(id);
    setIsLandingPageVisible(false); 
  };

  const toggleLandingPage = () => {
    setIsLandingPageVisible((prev) => !prev);
    console.log(isLandingPageVisible);
  };

  return (
    <div>
      <label className="hamburger">
        <input type="checkbox" checked={isLandingPageVisible} onChange={toggleLandingPage} />
        <svg viewBox="0 0 32 32">
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path className="line" d="M7 16 27 16"></path>
        </svg>
      </label>
  
      {isLandingPageVisible && (
        <LandingPage onGameSelect={handleSetGameID} />
      )}
  
      <Game gameID={gameID} />
    </div>
  );
}

export default App;