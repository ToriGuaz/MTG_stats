import React, { useState } from 'react';

const PrincipalPlayer = () => {

  const [life, setLife] = useState(40); 
  const [counter, setCounter] = useState(0);

  const changeLife = (amount) => {
    setLife(life + amount);
  };

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <h2>PrincipalPlayer</h2> 
      <p>Vida: {life}</p>
      <p>Counter: {counter}</p>
      <ul className="lifeButtons">
        <li><button onClick={() => changeLife(1)}>+1</button></li>
        <li><button onClick={() => changeLife(-1)}>-1</button></li>
        <li><button onClick={() => changeLife(5)}>+5</button></li>
        <li><button onClick={() => changeLife(-5)}>-5</button></li>
      </ul>
      <button className="counterButton" onClick={incrementCounter}>Counter</button>
    </div>
  );
};

export default PrincipalPlayer;