import React, { useState } from 'react';
import { getDatabase, ref, get, child, push, set, } from 'firebase/database';
import { db } from './firebaseConfig';

function LandingPage() {
  const [inputGameName, setGameName] = useState('');
  const [inputPlayerName, setPlayerName] = useState('');
  const [games, setGames] = useState([]);


  const createGame  = async () => {
    const newGameRef = push(ref(db, 'games'));
    set(newGameRef, { 
      gameName: inputGameName,
      players: [
        {PlayerName: inputPlayerName,
          life: 40,
          counter: 0
        }]
    }).then(() => {
      alert("data saved")}).catch((error) => {
        alert("Error: " + error.message);
      })
  }

  const dbRef = ref(getDatabase());
    get(child(dbRef, `games`)).then((snapshot) => {
    if (snapshot.exists()) {
       setGames(Object.values(snapshot.val()));
      //console.log("Data retrieved successfully:", snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  console.log(games);
  

  return (
    <div>
      <p>Únete a una partida o crea una nueva</p>
      <input
        type="text"
        placeholder="Nombre de jugador"
        value={inputPlayerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <form>
        <label>unirse a partida</label>
          <select name="partidas">
            {games.map((item, index) => (
              <option key={index}>
                {item.GameName}
              </option>
            ))}
            </select>
      </form>
      <input
        //crear partida nueva
        type="text"
        placeholder="crear partida"
        value={inputGameName}
        onChange={(e) => setGameName(e.target.value)}
      />
      <button onClick={createGame}>Crear partida</button>
    </div>
  );
};

export default LandingPage;
