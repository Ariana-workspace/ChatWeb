import { useState } from "react"
import MyFriends from './MyFriends'
import Add from "./Add"
import Solicitudes from './Solicitudes'
import "../styles/Friends.css"
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
        <li><button onClick={() => cambiarSeccionAmigo("friend")} className='bg-jared'>my frie</button></li>
        <li><button onClick={() => cambiarSeccionAmigo("add")} className='bg-jared'>add</button></li>
        <li><button onClick={() => cambiarSeccionAmigo("solicitud")} className='bg-jared'>solicitudes</button></li>
      </ul>
      
      {friend && <MyFriends/>}
      {add && <Add/>}
      {solicitud && <Solicitudes/>}
      
    </div>
  )
}

export default Amigos
