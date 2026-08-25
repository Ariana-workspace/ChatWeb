import React from 'react'
import { useEffect, useState} from 'react'
import { conectarWebSocket, suscribirse,enviarMensaje,desconectarWebSocket } from '../../services/chatService'
import '../../styles/Chat.css'
import '../../styles/main.css'
import Mensaje from '../../components/Mensaje'
import Nav from '../../components/Nav'
const Chat = () => {
  const [chat, setChat] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [conectado, setConectado] = useState(false);
    const token =localStorage.getItem("token");
    const id_usuario =localStorage.getItem("id_usuario");
    const email = localStorage.getItem("email");

    const handleEnviar = () => {
    if (!mensaje.trim()) return; // evita mandar vacío
    enviarMensaje({
      id_grupo:1, 
        id_usuario: id_usuario,
        contenido: mensaje
    });
    setMensaje(""); // limpia el input después de enviar
};

useEffect(() => {
    conectarWebSocket();
    suscribirse((msg) => {
        setChat((prevChat) => [...prevChat, msg]);
    });

    return () => {
        desconectarWebSocket();
    };
}, []);
    
  return (
    <div className='contenedor-main'>
      <Nav/>

      <div className='contenedor-completo'>
        
        <div className='contenedor-chat'>
        {chat.map((m,i) => 
            (
                <Mensaje key={i} usuario={m.usuario} contenido={m.contenido} fecha={m.fecha} />
            )
         )
        }
      </div>
       <div className='c-escribir'>
        <input className='txt-write' type="text" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
        <button className='btn-chat bg-jared text-white' onClick={handleEnviar}>↑</button>
      </div>

      </div>
    </div>
  )
}

export default Chat
