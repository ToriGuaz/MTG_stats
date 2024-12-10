import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';

const Opponent = ({ opponentID, gameID }) => {
  const [lifeCount, setLifeCount] = useState(40);
  const [opponentName, setOpponentName] = useState('');
  const [mana, setMana] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    x: 0,
  });

  useEffect(() => {
    if (!opponentID || !gameID) {
      console.warn("Missing opponentID or gameID:", { opponentID, gameID });
      return;
    }

    const playerRef = ref(db, `games/${gameID}/players/${opponentID}`);

    onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOpponentName(data.playerName || 'Jugador sin nombre');
        setLifeCount(data.life !== undefined ? data.life : 40);
        setMana({
          a: data.mana.a || 0,
          b: data.mana.b || 0,
          c: data.mana.c || 0,
          d: data.mana.d || 0,
          e: data.mana.e || 0,
          x: data.mana.x || 0,
        });
      } else {
        console.log('Datos del oponente no encontrados.');
      }
    });
  }, [opponentID, gameID]);

  return (
    <div className="oponente">
      <p>{opponentName}</p>
      <h2>{lifeCount}</h2>
      <ul>
        {Object.entries(mana)
          .filter(([_, value]) => value !== 0) 
          .map(([type, value]) => (
            <li className='mana' key={type}>
              {type} {value}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Opponent;

