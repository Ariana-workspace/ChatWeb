import { useState} from "react"
import Chat from '../chat/Chat'
import Nav from "../../components/Nav.jsx"
import Vista from "../vista/Vista"
import "../../styles/main.css"
const Home = () => {

   const [id_perteneciente, setid_perteneciente] = useState(null);
  const [grupo, setGrupo] = useState(null);

  const handleSeleccionarGrupo = (g, id) => {
    setGrupo(g);
    setid_perteneciente(id);
    localStorage.setItem("id_grupo", id);
    localStorage.setItem("grupo", JSON.stringify(g));
    localStorage.setItem("id_chat_directo", id_chat_directo)
  };
  
    return (
      <>
      <div className='contenedor-global'>
      <Nav onSeleccionarGrupo={handleSeleccionarGrupo}/>
      <div className="contenedor-main">
        {grupo && <h1 className="text-white txt-title-group">{grupo.nombre}</h1>}
        {id_perteneciente && <Chat id_perteneciente={chat.id_chat_directo} tipo="directo" />}
      </div>
      <Vista/>
      </div>
      </>
    )
}
export default Home
