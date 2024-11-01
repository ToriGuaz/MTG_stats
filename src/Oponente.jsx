import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './firebaseConfig';

const Oponente = ({ opponentID }) => {
    const [vida, setVida] = useState(40);

    useEffect(() => {
        if (!opponentID) return; 

        const vidaRef = ref(db, `users/${opponentID}/vida`);
        const unsubscribe = onValue(vidaRef, (snapshot) => {
            setVida(snapshot.val() || 40); // Mantiene el valor inicial si no hay datos en la DB
        });

        // Cleanup listener al desmontar
        return () => unsubscribe();
    }, [opponentID]);

    if (!opponentID) return null; // Evita renderizar si no hay opponentID válido

    return (
        <div className="oponente">
            <h2>Oponente</h2>
            <p>Vida: {vida}</p>
        </div>
    );
};

export default Oponente;
