import React, { useEffect, useState } from 'react';
import { db, ref, onValue } from './firebaseConfig';

const Oponente = ({ opponentID }) => {
    const [vida, setVida] = useState(40);

    useEffect(() => {
        const vidaRef = ref(db, `users/${opponentID}/vida`);
        onValue(vidaRef, (snapshot) => {
            setVida(snapshot.val());
        });
    }, [opponentID]);

    return (
        <div className="oponente">
            <h2>Oponente</h2>
            <p>Vida: {vida}</p>
        </div>
    );
};

export default Oponente;
