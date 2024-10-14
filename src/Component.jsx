import React, {useState} from 'react'


export default function Component() {

    const [text, setText] = useState()
    const [updated, setUpdated] = useState()

    const textOnChange = (event) => {
        setText(event.target.value)
    }
    const textButtonOnClick = (event) => {
        setUpdated(text)
    }

  return (
    <div>
        <input type="text" value={text} onChange={textOnChange} />
        <button onClick={textButtonOnClick}>Guardar</button>
        <p>Texto imput: {text}</p>
        <p>Texto actualizado: {updated}</p>
    </div>
  )
}
