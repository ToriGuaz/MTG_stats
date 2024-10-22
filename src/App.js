import React from 'react';
import logo from './logo.svg';
import './App.css';
import Crearjugador from './CrearJugador';
import Usuario from './Usuario';
import Oponente from './Oponente';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Crearjugador/>
        <Usuario/>
        <Oponente/>
      </header>
    </div>
  );
}

export default App;
