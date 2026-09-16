import React from 'react'

const Amigos = () => {
  const [friend, setFriend] = useState(false)
  const [add, setAdd] = useState(false)
  const [solicitud, setSolicitud] = useState(false)

  const cambiarSeccionAmigo =(e)=>{
    if(e == "friend"){
        setFriend(true)
        setAdd(false)
        setSolicitud(false)
    }else if(e == "add"){
        setAdd(true)
        setFriend(false)
        setSolicitud(false)
    }else{
        setSolicitud(true)
        setFriend(false)
        setAdd(false)

    }

  }
  return (
    <div className='amigos'>
      {/* <img src="" alt="" /> */}
      <ul className='opciones'>
        <li><button onClick={() => cambiarSeccionAmigo("perfil")} className='bg-jared'>my frie</button></li>
        <li><button onClick={() => cambiarSeccionAmigo("perfil")} className='bg-jared'>add</button></li>
        <li><button onClick={() => cambiarSeccionAmigo("perfil")} className='bg-jared'>solicitudes</button></li>
      </ul>
      <input className='txt-write' type="text" placeholder='Buscar'/>
      {/* Debemos traer a los amigos del usuario */}
      <ul className='lista-amigos'>
        <li>amigo 1</li>
      </ul>
      
    </div>
  )
}

export default Amigos
