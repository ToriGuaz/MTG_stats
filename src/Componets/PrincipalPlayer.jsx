import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebaseConfig';

const PrincipalPlayer = ({gameID}) => {
  const playerID = localStorage.getItem('playerID') //por ahora solo agarramos del local storage porque las dos ya tenemos guardado nuestro id ahi
  //paso futuro, no asumir que ya esta en local storage el id.
  const playerRef = ref(db, `games/${gameID}/players/${playerID}`);
  const [playerName, setPlayerName] = useState('');

  const [life, setLife] = useState(40); 
  const [counter, setCounter] = useState(0);

  const changeLife = (newLife) => {
    setLife(newLife);
    update(playerRef, { life: newLife });
  };

  const incrementCounter = (newCounter) => {
    setCounter(newCounter);
    update(playerRef, { counter: newCounter });
  };
  useEffect(() => {
    onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPlayerName(data.playerName || '');
        setLife(data.life || 40);
        setCounter(data.counter || 0);
      } else {
        console.log('no tenes nombre, GIL');
      }
    });
  }, [playerRef]);

  return (
    <div className='principalPlayer'>
      <div className='infoPP'>
        <h2>{playerName}</h2> 
        <p>Vida: {life}</p>
        <p>Counter: {counter}</p>
      </div>
      <ul className="lifeButtons" >
        <li><button onClick={() => changeLife(life + 1)}>+1</button></li>
        <li><button onClick={() => changeLife(life - 1)}>-1</button></li>
        <li><button onClick={() => changeLife(life + 5)}>+5</button></li>
        <li><button onClick={() => changeLife(life - 5)}>-5</button></li>
        <li><button className="counterButton" onClick={() => incrementCounter( counter + 1)}>Counter</button></li>
      </ul>
    </div>
  );
};

export default PrincipalPlayer;