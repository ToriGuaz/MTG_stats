import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './firebaseConfig';

const Oponente = ({ oponentName }) => {
    const [lifeCount, setlifeCount] = useState(40);

    useEffect(() => {
        if (!oponentName) return; 

        const lifeCountRef = ref(db, `players/${oponentName}/lifeCount`);
        const unsubscribe = onValue(lifeCountRef, (snapshot) => {
            setlifeCount(snapshot.val() || 40); // Mantiene el valor inicial si no hay datos en la DB
        });

        // Cleanup listener al desmontar
        return () => unsubscribe();
    }, [oponentName]);

    if (!oponentName) return null; // Evita renderizar si no hay oponentName válido

    return (
        <div className="oponente">
            <h2>{oponentName}</h2>
            <p>lifeCount: {lifeCount}</p>
        </div>
    );
};

export default Oponente;
