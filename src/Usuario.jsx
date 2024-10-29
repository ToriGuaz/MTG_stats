import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { ref, set, onValue } from 'firebase/database';

const Usuario = ({ gameId }) => {
  const nombreJugador = localStorage.getItem('nombreJugador');
  const [vida, setVida] = useState(40);

  useEffect(() => {
    const jugadorRef = ref(db, `games/${gameId}/jugadores/${nombreJugador}/vida`);
    onValue(jugadorRef, (snapshot) => {
      setVida(snapshot.val() || 40);
    });
  }, [gameId, nombreJugador]);

  const actualizarVida = (nuevaVida) => {
    setVida(nuevaVida);
    const jugadorRef = ref(db, `games/${gameId}/jugadores/${nombreJugador}/vida`);
    set(jugadorRef, nuevaVida);
  };

  return (
    <div className="contenedorUsuario">
      <h1>{nombreJugador}</h1>
      <h2>Vida: {vida}</h2>
      <button onClick={() => actualizarVida(vida + 1)}>+1</button>
      <button onClick={() => actualizarVida(vida - 1)}>-1</button>
      <button onClick={() => actualizarVida(vida + 5)}>+5</button>
      <button onClick={() => actualizarVida(vida - 5)}>-5</button>
    </div>
  );
};

export default Usuario;
