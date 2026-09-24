import React from 'react'


const MyFriends = () => {
  return (
    <div>
      <input className='txt-write' type="text" placeholder='Buscar'/>
      {/* Debemos traer a los amigos del usuario */}
      <ul className='lista-amigos'>
        <li>amigo 1</li>
      </ul>
    </div>
  )
}

export default MyFriends
