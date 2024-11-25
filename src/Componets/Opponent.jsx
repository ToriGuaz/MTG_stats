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
          a: data.manaWhite || 0,
          b: data.manaBlue || 0,
          c: data.manaBlack || 0,
          d: data.manaRed || 0,
          e: data.manaGreen || 0,
          x: data.manaColorless || 0,
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
        <p>Maná:</p>
        {Object.entries(mana)
          .filter(([_, value]) => value !== 0) 
          .map(([type, value]) => (
            <li key={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}: {value}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Opponent;

