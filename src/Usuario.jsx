import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { ref, set, onValue } from 'firebase/database';

const Usuario = ({ gameId }) => {
  const playerName = localStorage.getItem('playerName'); //setear el player que corresponde a localtorage
  const [lifeCount, setlifeCount] = useState(40);

  useEffect(() => {
    const playerRef = ref(db, `games/${gameId}/players/${playerName}/lifeCount`);
    onValue(playerRef, (snapshot) => {
      setlifeCount(snapshot.val() || 40);
    });
  }, [gameId, playerName]);

  const updateLifeCount = (newLifeCount) => {
    setlifeCount(newLifeCount);
    const playerRef = ref(db, `games/${gameId}/players/${playerName}/lifeCount`);
    set(playerRef, newLifeCount);
  };

  return (
    <div className="contenedorUsuario">
      <h1>{playerName}</h1>
      <h2>lifeCount: {lifeCount}</h2>
      <div className='buttons'>
        <button onClick={() => updateLifeCount(lifeCount - 1)}>-1</button>
        <button onClick={() => updateLifeCount(lifeCount + 1)}>+1</button>
        <button onClick={() => updateLifeCount(lifeCount - 5)}>-5</button>
        <button onClick={() => updateLifeCount(lifeCount + 5)}>+5</button>
      </div>
    </div>
  );
};

export default Usuario;
