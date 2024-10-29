import React from 'react';
//import { useNavigate } from 'react-router-dom'

//import { collection, addDoc} from 'firebase/firestore'
//import { db } from firestore

const crearjugador = ({ onClick }) => {
  return (
    <button onClick={onClick} className="buttonStyle">
      Crear jugador!
    </button>
  );
};

export default crearjugador;