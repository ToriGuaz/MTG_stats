import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebaseConfig';

const PrincipalPlayer = ({ gameID }) => {
  const playerID = localStorage.getItem('playerID');
  const playerRef = ref(db, `games/${gameID}/players/${playerID}`);

  const [playerName, setPlayerName] = useState('');
  const [life, setLife] = useState(40);
  const [mana, setMana] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    x: 0,
  });

  const [showManaButtons, setShowManaButtons] = useState(false);

  // Cambiar vida y sincronizar con Firebase
  const changeLife = (newLife) => {
    setLife(newLife);
    update(playerRef, { life: newLife });
  };

  const changeMana = (type, value) => {
    const newMana = { ...mana, [type]: mana[type] + value };
    setMana(newMana);
    update(playerRef, { mana: newMana });
  };

  useEffect(() => {
    const unsubscribe = onValue(playerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPlayerName(data.playerName || '');
        setLife(data.life !== undefined ? data.life : 40);

        if (JSON.stringify(data.mana) !== JSON.stringify(mana)) {
          setMana(data.mana || {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            x: 0,
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
        <h2>{life}</h2>
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

      {/* Botón Hamburguesa para los contadores de mana */}
      <button
        className="manaToggleButton"
        onClick={() => setShowManaButtons(!showManaButtons)}
      >
        {showManaButtons ? 'Mana' : 'Mana'}
      </button>

      {/* Contadores de mana */}
      {showManaButtons && (
        <div className="manaButtons">
          {Object.keys(mana).map((color) => (
            <div className="manaContenedor" key={color}>
              <p>
                {color} {mana[color]}
              </p>
              <button onClick={() => changeMana(color, -1)}>-1</button>
              <button onClick={() => changeMana(color, +1)}>+1</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrincipalPlayer;
