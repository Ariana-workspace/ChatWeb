import {useEffect, useState} from "react"
import Chat from '../chat/Chat'
import Nav from "../../components/nav"
const Home = () => {
  const [mostrarChat, setMostrarChat] = useState(false)
  const idGrupoLocal = localStorage.getItem("id_grupo");
  const grupo = JSON.parse(localStorage.getItem("grupo"))

  useEffect(() =>{
    if(idGrupoLocal !== null){
    setMostrarChat(true)
  }
  },[])
  
  
    return (
      <>
      <div className='contenedor-global'>
      <Nav/>
      <div className="contenedor-main">
        <h1>{grupo.nombre}</h1>
        {mostrarChat && <Chat/>}
      </div>
      </div>
      </>
    )
}
export default Home
