import React from 'react'

const Amigos = () => {
  return (
    <div className='amigos'>
      {/* <img src="" alt="" /> */}
      <ul className='opciones'>
        <li><button className='bg-jared'>my frie</button></li>
        <li><button className='bg-jared'>add</button></li>
        <li><button className='bg-jared'>solicitudes</button></li>
      </ul>
      <input className='txt-write' type="text" placeholder='Buscar'/>
      <ul className='lista-amigos'>
        <li>amigo 1</li>
        <li>amigo 2</li>
        <li>amigo 3</li>
        <li>amigo 4</li>
        <li>amigo 5</li>
        <li>amigo 6</li>
        <li>amigo 1</li>
        <li>amigo 2</li>
        <li>amigo 3</li>
        <li>amigo 4</li>
        <li>amigo 5</li>
        <li>amigo 6</li>
        <li>amigo 1</li>
      </ul>
      
    </div>
  )
}

export default Amigos
