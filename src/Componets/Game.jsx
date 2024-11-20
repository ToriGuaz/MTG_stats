import React, { useEffect, useState } from 'react';
import PrincipalPlayer from './PrincipalPlayer';
import { ref, get, getDatabase, child } from 'firebase/database';
import Opponent from './Opponent'



function Game( {gameID} ) {
    const [gameName, setGameName] = useState('');
    const [players, setPlayers] = useState([]); 
    const principalPlayerID = localStorage.getItem('playerID');   

    if (!gameID && localStorage.getItem("gameID")) {
      gameID = localStorage.getItem("gameID");
    };

    useEffect(() => {
        if (gameID) {
          const dbRef = ref(getDatabase());
    
    
          get(child(dbRef, `games/${gameID}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const data = snapshot.val();
                setGameName(data.gameName); 
                
                if (data.players) {
                  setPlayers(Object.keys(data.players)); 

                } else {
                  setPlayers([]); 
                }
                
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }, [gameID]);

      if (!gameID || !principalPlayerID) {
        return (
          <div className="game">
            <h2 className="gameName">Por favor, selecciona o crea una partida.</h2>
          </div>
        );
      }

  return (
    <div className='game'>
        <h2 className='gameName'> Partida: {gameName}</h2>
        <PrincipalPlayer gameID={gameID} />
        <ul className="listaDeOponentes">
            {players
            .filter((playerID) => playerID !== principalPlayerID)
            .map((playerID) => {
            return (
                <li  key={playerID}>
                <Opponent opponentID={playerID} gameID={gameID} />
                </li>
            );
            })}
        </ul>

    </div>
  );
}

export default Game
