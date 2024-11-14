import React, { useEffect, useState } from 'react';
import PrincipalPlayer from './PrincipalPlayer';
import { ref, get, getDatabase, child } from 'firebase/database';
import Opponent from './Opponent'



function Game( {gameID} ) {
    const [gameName, setGameName] = useState('');
    const [players, setPlayers] = useState([]);    

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

  const principalPlayerID = localStorage.getItem('playerID');

  return (
    <div className='game'>
        <h2 className='gameName'> Partida: {gameName}</h2>
        <PrincipalPlayer gameID={gameID} />
        <ul className="listaDeOponentes">
            {players
            .filter((playerID) => playerID !== principalPlayerID)
            .map((playerID) => {
            //console.log("Rendering Opponent with:", item);
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



/*        <ul>
            {players.map((item, index) => (//ver de hacer esto de forma que se actualice con los cambios.
            <li key={index}>
                {item.playerName}: {item.life} : {item.counter}
            </li>
            ))}
        </ul> */