import {useEffect, useState} from "react"
import Chat from '../chat/Chat'
import Nav from "../../components/Nav"
import Vista from "../vista/Vista"
const Home = () => {
   const [idGrupo, setIdGrupo] = useState(localStorage.getItem("id_grupo") || null);
  const [grupo, setGrupo] = useState(JSON.parse(localStorage.getItem("grupo") || "null"));

  const handleSeleccionarGrupo = (g, id) => {
    setGrupo(g);
    setIdGrupo(id);
    localStorage.setItem("id_grupo", id);
    localStorage.setItem("grupo", JSON.stringify(g));
  };
  
  
    return (
      <>
      <div className='contenedor-global'>
      <Nav onSeleccionarGrupo={handleSeleccionarGrupo}/>
      <div className="contenedor-main">
        {grupo && <h1 className="text-white txt-title-group">{grupo.nombre}</h1>}
        {idGrupo && <Chat idGrupo={idGrupo}/>}
      </div>
      <Vista/>
      </div>
      </>
    )
}
export default Home
