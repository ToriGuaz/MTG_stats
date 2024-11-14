import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';


const Opponent = ({ opponentID , gameID }) => {
    const [lifeCount, setlifeCount] = useState(40);
    const [opponentName, setOpponentName] = useState(''); 
    const [counter, setCounter] = useState(0);


    useEffect(() => {
        if (!opponentID || !gameID) {
            console.warn("Missing opponentID or gameID:", { opponentID, gameID });
            return; 
        }

        const lifeCountRef = ref(db, `games/${gameID}/players/${opponentID}`);

        onValue(lifeCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setOpponentName(data.playerName || 'jugador no puso nombre');
                setlifeCount(data.life !== undefined ? data.life : 40);
                setCounter(data.counter || 0);
              } else {
                console.log('no tenes nombre, GIL');
              }
 
        });

    }, [opponentID, gameID]);

    return (
        <div className="oponente">
            <h2>{opponentName}</h2>
            <p> Vida: {lifeCount}</p>
            <p> Contador: {counter} </p>
        </div>
    );
};

export default Opponent;
