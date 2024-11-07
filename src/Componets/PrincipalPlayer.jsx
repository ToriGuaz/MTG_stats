import React from 'react'


const PrincipalPlayer = () => {
  return (
    <div><h2>PrincipalPlayer</h2> 
{/*aca va el player con id: localstorage*/} 
        <ul className="lifeButtons">
        <li><button>+1</button></li>
        <li><button>-1</button></li>
        <li><button>+5</button></li>
        <li><button>-5</button></li>
        </ul>
        <button className="counterButton">Counter</button>
    </div>
  )
}

export default PrincipalPlayer