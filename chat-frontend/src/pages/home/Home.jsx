import { useState} from "react"
import Chat from '../chat/Chat'
import Nav from "../../components/Nav.jsx"
import Vista from "../vista/Vista"
import "../../styles/main.css"
const Home = () => {
  const [id_perteneciente, setId_perteneciente] = useState(null);
  const [tipo, setTipo] = useState("grupo");
  const [grupo, setGrupo] = useState(null);
  
  const handleSeleccionarGrupo = (g, id) => {
    setGrupo(g);
    setTipo("grupo");
    setId_perteneciente(id);
    localStorage.setItem("id_grupo", id);
    localStorage.setItem("grupo", JSON.stringify(g));
    localStorage.removeItem("id_chat_directo");
  };
  
  const handleSeleccionarChatDirecto = (id_chat_directo) => {
    setGrupo(null);
    setTipo("directo");
    setId_perteneciente(id_chat_directo);
    localStorage.setItem("id_chat_directo", id_chat_directo);
    localStorage.removeItem("id_grupo");
    localStorage.removeItem("grupo");
  };
  
    return (
      <>
      <div className='contenedor-global'>
      <Nav onSeleccionarGrupo={handleSeleccionarGrupo}/>
      <div className="contenedor-main">
        {grupo && <h1 className="text-white txt-title-group">{grupo.nombre}</h1>}
        {id_perteneciente && (
        <Chat
        key={`${tipo}-${id_perteneciente}`}
        id_perteneciente={id_perteneciente}
        tipo={tipo}
        />
        )}
      </div>
      <Vista onSeleccionarChatUnico={handleSeleccionarChatDirecto} />
      </div>
      </>
    )
}
export default Home
