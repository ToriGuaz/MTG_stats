import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebaseConfig';

const PrincipalPlayer = ({ gameID }) => {
  const playerID = localStorage.getItem('playerID');
  const playerRef = ref(db, `games/${gameID}/players/${playerID}`);

  const [playerName, setPlayerName] = useState('');
  const [life, setLife] = useState(40);
  const [mana, setMana] = useState({
    red: 0,
    blue: 0,
    green: 0,
    black: 0,
    white: 0,
    colorless: 0,
  });

  // Cambiar vida y sincronizar con Firebase
  const changeLife = (newLife) => {
    setLife(newLife);
    update(playerRef, { life: newLife });
  };

  // Cambiar maná y sincronizar con Firebase
  const changeMana = (type, value) => {
    const newMana = { ...mana, [type]: mana[type] + value };
    setMana(newMana);
    update(playerRef, { mana: newMana });
  };

  // Sincronizar estado con Firebase
  useEffect(() => {
    const unsubscribe = onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPlayerName(data.playerName || '');
        setLife(data.life !== undefined ? data.life : 40);

        // Solo actualiza el estado de `mana` si cambió
        if (JSON.stringify(data.mana) !== JSON.stringify(mana)) {
          setMana(data.mana || {
            red: 0,
            blue: 0,
            green: 0,
            black: 0,
            white: 0,
            colorless: 0,
          });
        }
      }
    });
    return () => unsubscribe();
  }, [playerRef, mana]);

  return (
    <div className="principalPlayer">
      <div className="infoPP">
        <h2>{playerName}</h2>
        <p>Vida: {life}</p>
      </div>
      <ul className="lifeButtons">
        <li>
          <button onClick={() => changeLife(life - 1)}>-1</button>
        </li>
        <li>
          <button onClick={() => changeLife(life + 1)}>+1</button>
        </li>
        <li>
          <button onClick={() => changeLife(life - 5)}>-5</button>
        </li>
        <li>
          <button onClick={() => changeLife(life + 5)}>+5</button>
        </li>
      </ul>
      <div className="manaButtons">
        {Object.keys(mana).map((color) => (
          <div key={color}>
            <p>{color.charAt(0).toUpperCase() + color.slice(1)}: {mana[color]}</p>
            <button onClick={() => changeMana(color, -1)}>-1</button>
            <button onClick={() => changeMana(color, +1)}>+1</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrincipalPlayer;
