import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';

const Opponent = ({ opponentID, gameID }) => {
  const [lifeCount, setLifeCount] = useState(40);
  const [opponentName, setOpponentName] = useState('');
  const [mana, setMana] = useState({
    red: 0,
    blue: 0,
    green: 0,
    black: 0,
    white: 0,
    colorless: 0,
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
          red: data.manaRed || 0,
          blue: data.manaBlue || 0,
          green: data.manaGreen || 0,
          black: data.manaBlack || 0,
          white: data.manaWhite || 0,
          colorless: data.manaColorless || 0,
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

