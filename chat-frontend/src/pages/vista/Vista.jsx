import "../../styles/Vista.css"
import {useState} from "react"
import Config from "./Config"
import Perfil from "./Perfil"
import Amigos from "./Amigos"
const Vista = () => {
  const [seleccionado, setSeleccionado] = useState(false)
  const [perfil, setPerfil] = useState(false)
  const [amigos, setAmigos] = useState(false)
  const [config, setConfig] = useState(false)

  const cambiarPagina =(e)=>{
    if(e == "perfil"){
        setPerfil(true)
        setAmigos(false)
        setConfig(false)
    }else if(e == "amigos"){
        setAmigos(true)
        setConfig(false)
        setPerfil(false)
    }else{
        setConfig(true)
        setPerfil(false)
        setAmigos(false)

    }

  }
  return (
    <>
    <div className='contenedor-de-navegacion'>
      <ul className='header-nav'>
              <li><button onClick={() => cambiarPagina("perfil")} className={perfil ? "btn text-white bg-jared" : "btn black-btn text-white"} >perfil</button></li> 
              <li><button onClick={() => cambiarPagina("amigos")}  className={amigos ? "btn text-white bg-jared" : "btn black-btn  text-white"}>amigos</button></li> 
              <li><button onClick={() => cambiarPagina("config")}  className={perfil ? "btn text-white bg-jared" : "btn black-btn  text-white"}>config</button></li>
            </ul>
        <div className='navegacion'>
            
            {perfil && <Perfil/>}
            {amigos && <Amigos/>}
            {config && <Config/>}
            
        </div>
    </div>
    

    </>
  )
}

export default Vista
