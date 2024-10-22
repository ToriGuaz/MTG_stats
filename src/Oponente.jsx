import React, { useState } from 'react';
import './Oponente.css';

const Oponente = () => {
  const [oponentes, setOponentes] = useState([
    { nombre: 'Evelina', vida: 40 },
    { nombre: 'Kragg', vida: 40 },
    { nombre: 'Thorn', vida: 40 }
  ]); // Array inicial de oponentes

  return (
    <div className="contenedorOponentes">
      {oponentes.map((oponente, index) => (
        <div key={index} className="contenedorOponente">
          <h1>{oponente.nombre}</h1>
          <h2>Vida: {oponente.vida}</h2>
        </div>
      ))}
    </div>
  );
};

export default Oponente;