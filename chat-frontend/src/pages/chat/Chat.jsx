import React from 'react'
import { useEffect, useState} from 'react'
import { conectarWebSocket, suscribirse,enviarMensaje,desconectarWebSocket } from '../../services/chatService'
import '../../styles/Chat.css'
import '../../styles/main.css'
import Mensaje from '../../components/Mensaje'
import { usuarioPorId } from '../../services/usuarioService'
const Chat = () => {
  const [chat, setChat] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [user, setUser] = useState([])
  const id_usuario =localStorage.getItem("id_usuario");
  const idGrupoLocal = localStorage.getItem("id_grupo");
    const handleEnviar = () => {
    if (!mensaje.trim()) return; // evita mandar vacío
    enviarMensaje({
      id_grupo:idGrupoLocal, 
        id_usuario: id_usuario,
        contenido: mensaje
    });
    setMensaje(""); 
};

useEffect(() => {
    conectarWebSocket();
    suscribirse((msg) => {
        setChat((prevChat) => [...prevChat, msg]);
    });
    const cargarUsuarioUwu= async () =>{
      const data = await usuarioPorId(id_usuario);
      setUser(data)
      return data;
    }

    cargarUsuarioUwu()
    return () => {
        desconectarWebSocket();
    };
    
}, []);
    
  return (
    

      <div className='chat'>
        
        <div className='contenedor-chat'>
        {chat.map((m,i) => 
            (
                <Mensaje key={i} usuario={user.nombre} contenido={m.contenido} fecha={m.fecha} />
            )
         )
        }
      </div>
       <div className='c-escribir'>
        <input className='txt-write' type="text" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
        <button className='btn-chat bg-jared text-white' onClick={handleEnviar}>↑</button>
      </div>

      </div>
  
  )
}

export default Chat
