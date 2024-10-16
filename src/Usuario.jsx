import React, { useState } from 'react';

const Usuario = () => {
  const [vida, setVida] = useState(20); // La vida comienza en 20
  const nombre = 'Toribia'; // Variable para el nombre

  const aumentarVida = () => {
    setVida(vida + 1);
  };

  const disminuirVida = () => {
    setVida(vida - 1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{nombre}</h1>
      <h2>Vida: {vida}</h2>
      <button onClick={aumentarVida} style={{ marginRight: '10px' }}>+</button>
      <button onClick={disminuirVida}>-</button>
    </div>
  );
};

export default Usuario;
