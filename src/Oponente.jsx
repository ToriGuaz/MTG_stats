import React, { useState } from 'react';

const Oponente = () => {
  const [vida, setVida] = useState(20); // Vida inicial
  const nombre = 'Evelina'; // Nombre del oponente

  return (
    <div style={styles.recuadro}>
      <h1>{nombre}</h1>
      <h2>Vida: {vida}</h2>
    </div>
  );
};

const styles = {
  recuadro: {
    border: '2px solid black',
    borderRadius: '10px',
    padding: '20px',
    width: '200px',
    textAlign: 'center',
    margin: '20px auto',
    boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.1)',
  },
};

export default Oponente;