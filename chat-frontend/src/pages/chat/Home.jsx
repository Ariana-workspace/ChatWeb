import React from 'react'
import { useEffect, useState} from 'react'
import { conectarWebSocket, suscribirse,enviarMensaje,desconectarWebSocket } from '../../services/chatService'
import '../../styles/Chat.css'
import Mensaje from '../../components/Mensaje'
const Home = () => {
    const [chat, setChat] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [conectado, setConectado] = useState(false);
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const handleEnviar = () => {
    if (!mensaje.trim()) return; // evita mandar vacío
    enviarMensaje({
      id_grupo:1,
        id_usuario: usuario.id_usuario,
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
    <div>

      <div>
        <h1>MainChat</h1>
      <label>Escribe tu mensaje: </label>
        <input type="text" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
        <button onClick={handleEnviar}>Enviar</button>
      </div>

      <div className='contenedor-chat'>
        {chat.map((m,i) => 
            (
                <Mensaje key={i} usuario={m.usuario} contenido={m.contenido} fecha={m.fecha} />
            )
         )
        }
      </div>
    </div>
  )
}

export default Home
