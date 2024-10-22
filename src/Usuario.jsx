import React, { useState } from 'react';
import './Usuario.css';

const Usuario = () => {
  const [vida, setVida] = useState(40); // La vida comienza en 20
  const nombre = 'Toribia'; // Variable para el nombre

  const aumentarVida = () => {
    setVida(vida + 1);
  };

  const disminuirVida = () => {
    setVida(vida - 1);
  };

  const aumentarVida5 = () => {
    setVida(vida + 5);
  };

  const disminuirVida5 = () => {
    setVida(vida - 5);
  };

  return (
    <div className="contenedorUsuario">
      <h1>{nombre}</h1>
      <h2>Vida: {vida}</h2>
        <div >
      <button className="buttonStyle" onClick={aumentarVida} >+</button>
      <button className="buttonStyle" onClick={disminuirVida}>-</button> 
      <button className="buttonStyle" onClick={aumentarVida5} >+5</button>
      <button className="buttonStyle" onClick={disminuirVida5} >-5</button>
        </div>
    </div>
  );
};

export default Usuario;
