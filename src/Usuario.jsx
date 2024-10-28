import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; // Asegúrate de importar db
import { ref, onValue, set } from 'firebase/database';
import './Usuario.css';

const Usuario = ({ userId }) => {
  const [vida, setVida] = useState(40);
  const nombre = 'Toribia';

  // Cargar la vida desde la base de datos al iniciar
  useEffect(() => {
    const vidaRef = ref(db, `users/${userId}/vida`);
    onValue(vidaRef, (snapshot) => {
      const vidaValue = snapshot.val();
      if (vidaValue !== null) {
        setVida(vidaValue);
      }
    });
  }, [userId]);

  // Actualizar vida en la base de datos
  const actualizarVidaEnDB = (nuevaVida) => {
    set(ref(db, `users/${userId}/vida`), nuevaVida);
  };

  const aumentarVida = () => {
    const nuevaVida = vida + 1;
    setVida(nuevaVida);
    actualizarVidaEnDB(nuevaVida);
  };

  const disminuirVida = () => {
    const nuevaVida = vida - 1;
    setVida(nuevaVida);
    actualizarVidaEnDB(nuevaVida);
  };

  const aumentarVida5 = () => {
    const nuevaVida = vida + 5;
    setVida(nuevaVida);
    actualizarVidaEnDB(nuevaVida);
  };

  const disminuirVida5 = () => {
    const nuevaVida = vida - 5;
    setVida(nuevaVida);
    actualizarVidaEnDB(nuevaVida);
  };

  return (
    <div className="contenedorUsuario">
      <h1>{nombre}</h1>
      <h2>Vida: {vida}</h2>
      <div>
        <button className="buttonStyle" onClick={aumentarVida}>+</button>
        <button className="buttonStyle" onClick={disminuirVida}>-</button>
        <button className="buttonStyle" onClick={aumentarVida5}>+5</button>
        <button className="buttonStyle" onClick={disminuirVida5}>-5</button>
      </div>
    </div>
  );
};

export default Usuario;
