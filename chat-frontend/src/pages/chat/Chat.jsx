
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
    if (!id_perteneciente) return;

    let activo = true;
    mensajesEnVivo.current = [];

    const iniciarChat = async () => {
      try {
        // Iniciar la conexión y suscribirse antes de cargar el historial.
        conectarWebSocket();

        suscribirse(tipo, id_perteneciente, (msg) => {
          if (!activo) return;

          // Guardar los mensajes recibidos mientras carga el historial.
          mensajesEnVivo.current = agregarSinDuplicar(
            mensajesEnVivo.current,
            msg
          );

          setChat((prev) => agregarSinDuplicar(prev, msg));
        });

        const [datosUsuario, historial] = await Promise.all([
          usuarioPorId(id_usuario),
          tipo === "directo"
          ? historialDeMensajePorGrupo(id_perteneciente) :
          historialDeMensajePorChatDirecto(id_perteneciente)
        ]);

        if (!activo) return;

        setUser(datosUsuario);

        // Combinar el historial con mensajes que llegaron durante la carga.
        const combinados = [...(Array.isArray(historial) ? historial : [])];

        mensajesEnVivo.current.forEach((msg) => {
          const existe = combinados.some((m) => {
            if (m.id_mensaje != null && msg.id_mensaje != null) {
              return m.id_mensaje === msg.id_mensaje;
            }

            return (
              String(m.id_usuario ?? '') === String(msg.id_usuario ?? '') &&
              m.contenido === msg.contenido &&
              m.fecha === msg.fecha
            );
          });

          if (!existe) combinados.push(msg);
        });

        setChat(combinados);
      } catch (error) {
        console.error('Error al cargar el chat:', error);
      }
    };

    iniciarChat();

    return () => {
      activo = false;
      desconectarWebSocket();
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
        {chat.map((m, i) => (
          <Message
            key={m.id_mensaje ?? i}
            usuario={m.nombre ?? m.usuario ?? user?.nombre ?? 'Usuario'}
            contenido={m.contenido}
            fecha={m.fecha}
          />
        ))}
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
