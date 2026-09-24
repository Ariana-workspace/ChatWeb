import React from 'react'

const Add = () => {
  return (
    <div>
      <input className='txt-write' type="text" placeholder='Buscar'/>
      {/* Debemos traer a los amigos del usuario */}
      <ul className='lista-amigos'>
        <li>amigo 2</li>
      </ul>
    </div>
  )
}

export default Add
