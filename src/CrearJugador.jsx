import React from 'react';

const crearjugador = ({ onClick }) => {
  return (
    <button onClick={onClick} className="buttonStyle">
      Crear jugador!
    </button>
  );
};

export default crearjugador;