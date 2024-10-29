import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; // Asegúrate de importar db
import { ref, onValue, set } from 'firebase/database';
import './Oponente.css';

const Oponente = ({ oponenteId }) => {
  const [vida, setVida] = useState(40); // La vida comienza en 40
  const nombre = 'Oponente'; // Cambia esto si necesitas que sea dinámico

  // Cargar la vida del oponente desde la base de datos al iniciar
  useEffect(() => {
    const vidaRef = ref(db, `oponentes/${oponenteId}/vida`);
    onValue(vidaRef, (snapshot) => {
      const vidaValue = snapshot.val();
      if (vidaValue !== null) {
        setVida(vidaValue);
      }
    });
  }, [oponenteId]);

  // Actualizar vida en la base de datos
  const actualizarVidaEnDB = (nuevaVida) => {
    set(ref(db, `oponentes/${oponenteId}/vida`), nuevaVida);
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
    <div className="contenedorOponente">
      <h1>{nombre}</h1>
      <h2>Vida: {vida}</h2>
      {/*<div>
        <button className="buttonStyle" onClick={aumentarVida}>+</button>
        <button className="buttonStyle" onClick={disminuirVida}>-</button>
        <button className="buttonStyle" onClick={aumentarVida5}>+5</button>
        <button className="buttonStyle" onClick={disminuirVida5}>-5</button>
      </div>*/}
    </div>
  );
};

export default Oponente;
