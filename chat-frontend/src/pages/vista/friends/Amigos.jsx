import { useState } from "react"
import MyFriends from './MyFriends'
import Add from "./Add"
import Solicitudes from './Solicitudes'
import "../styles/Friends.css"
const Amigos = () => {
  const [friend, setFriend] = useState(true)
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
      <ul className='opciones'>
        <li><button onClick={() => cambiarSeccionAmigo("friend")}
        className={friend ? "bg-jared": "bg-no-seleccionado"}>my frie</button></li>
        <li><button onClick={() => cambiarSeccionAmigo("add")} className={add ? "bg-jared": "bg-no-seleccionado"}>add</button></li>
        <li><button onClick={() => cambiarSeccionAmigo("solicitud")} className={solicitud ? "bg-jared": "bg-no-seleccionado"}>solicitudes</button></li>
      </ul>
      
      {friend && <MyFriends/>}
      {add && <Add/>}
      {solicitud && <Solicitudes/>}
      
    </div>
  )
}

export default Amigos
