import React, { useState } from 'react';
import './Oponente.css';

const Oponente = () => {
  const [vida, setVida] = useState(20); // Vida inicial
  const nombre = 'Evelina'; // Nombre del oponente

  return (
    <div className="contenedorOponente">
      <h1>{nombre}</h1>
      <h2>Vida: {vida}</h2>
    </div>
  );
};



export default Oponente;