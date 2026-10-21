
import { useEffect, useState, useRef } from 'react';
import {
  conectarWebSocket,
  suscribirse,
  enviarMensaje,
  desconectarWebSocket
} from '../../services/chatService';
import '../../styles/Chat.css';
import { usuarioPorId } from '../../services/usuarioService';
import { historialDeMensajePorGrupo, historialDeMensajePorChatDirecto } from '../../services/mensaje';
import Message from '../../components/Message';

const Chat = ({ id_perteneciente, tipo = 'grupo' }) => {
  const [chat, setChat] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [user, setUser] = useState(null);

  const id_usuario = localStorage.getItem('id_usuario');
  const chatRef = useRef(null);
  const mensajesEnVivo = useRef([]);
  const [nombres, setNombres] = useState({}); // { id_usuario: "nombre" }
  const pedidos = useRef(new Set());          // ids que ya pedí
  const cargarNombre = async (id) => {
    if(id == null || pedidos.current.has(String(id))) return;
    pedidos.current.add(String(id));
    try{
      const u = await usuarioPorId(id);
      setNombres((prev) => ({...prev, [id]: u?.nombre ?? "Usuario"}))
    }catch(e){
      pedidos.current.delete(String(id));
    }
  }
  

  const agregarSinDuplicar = (lista, nuevo) => {
    const existe = lista.some((m) => {
      if (m.id_mensaje != null && nuevo.id_mensaje != null) {
        return m.id_mensaje === nuevo.id_mensaje;
      }

      return (
        String(m.id_usuario ?? '') === String(nuevo.id_usuario ?? '') &&
        m.contenido === nuevo.contenido &&
        m.fecha === nuevo.fecha
      );
    });
    return existe ? lista : [...lista, nuevo];
  };

  const handleEnviar = (e) => {
    
    e.preventDefault();
    const contenido = mensaje.trim();
    if (!contenido || !id_perteneciente || !id_usuario) return;
    enviarMensaje({
      id_grupo: tipo === "grupo" ? id_perteneciente:null,
      id_chat_directo: tipo === "directo" ? id_perteneciente:null,
      id_usuario,
      contenido
    });
    setMensaje('');
  };

  useEffect(() => {
    console.log("Chat MONTADO", tipo, id_perteneciente);
    if (!id_perteneciente) return;

    let activo = true;
    mensajesEnVivo.current = [];

    conectarWebSocket(); // si ya hay conexión, no hace nada

  const cancelar = suscribirse(tipo, id_perteneciente, (msg) => {
    if (!activo) return;
    mensajesEnVivo.current = agregarSinDuplicar(mensajesEnVivo.current, msg);
    setChat((prev) => agregarSinDuplicar(prev, msg));
  });

  const cargarHistorial = async () => {
    try {
      const [datosUsuario, historial] = await Promise.all([
        usuarioPorId(id_usuario),
        tipo === 'directo'
          ? historialDeMensajePorChatDirecto(id_perteneciente)
          : historialDeMensajePorGrupo(id_perteneciente),
      ]);

      if (!activo) return;

      setUser(datosUsuario);

      const combinados = mensajesEnVivo.current.reduce(
        agregarSinDuplicar,
        Array.isArray(historial) ? historial : []
      );

      setChat(combinados);
    } catch (error) {
      console.error('Error al cargar el chat:', error);
    }
  };

  cargarHistorial();

  return () => {
    activo = false;
    cancelar(); // solo cancela esta suscripción, no desconecta
  };
}, [id_perteneciente, id_usuario, tipo]);

  // Bajar automáticamente al último mensaje.
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="chat">
      <div className="contenedor-chat" ref={chatRef}>
        {chat.map((m, i) => {
          const esMio = String(m.id_usuario) === String(id_usuario);
          return (
            <Message
            key={m.id_mensaje ?? i}
            usuario={esMio ? 'Tú' : (nombres[m.id_usuario] ?? '...')}
            contenido={m.contenido}
            fecha={m.fecha}
            esMio={esMio}
          />
          )
        })
        }
      </div>

      <form className="c-escribir" onSubmit={handleEnviar}>
        <input
          className="mensajear"
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
          autoComplete="off"
        />

        <button
          type="submit"
          className="btn-chat bg-violet text-white"
          disabled={!mensaje.trim()}
        >
          ↑
        </button>
      </form>
    </div>
  );
};

export default Chat;
