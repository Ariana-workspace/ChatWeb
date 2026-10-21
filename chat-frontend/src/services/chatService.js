import { Client } from "@stomp/stompjs";

let client = null;
let suscripciones = []; // { destino, callback, sub }

const activarSuscripcion = (s) => {
  s.sub = client.subscribe(s.destino, (frame) => {
    s.callback(JSON.parse(frame.body));
  });
};

export const conectarWebSocket = () => {
  if (client) return; // ya hay una conexión

  client = new Client({
    brokerURL: import.meta.env.VITE_WS_URL,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("Conectado al WebSocket");
      suscripciones.forEach(activarSuscripcion);
    },
    onStompError: (frame) => console.error("Error STOMP:", frame),
    onWebSocketError: (e) => console.error("Error de WebSocket:", e),
  });

  client.activate();
};

export function suscribirse(tipo, id, onMensaje) {
  const s = { destino: `/topic/chat/${tipo}/${id}`, callback: onMensaje, sub: null };
  suscripciones.push(s);

  if (client && client.connected) activarSuscripcion(s);

  return () => {
    if (s.sub) s.sub.unsubscribe();
    suscripciones = suscripciones.filter((x) => x !== s);
  };
}

export function enviarMensaje({ id_usuario, contenido, id_grupo = null, id_chat_directo = null }) {
  if (!client || !client.connected) {
    console.warn("Todavía no hay conexión, mensaje no enviado");
    return;
  }
  client.publish({
    destination: "/app/chat",
    body: JSON.stringify({ id_usuario, contenido, id_grupo, id_chat_directo }),
  });
}

export const desconectarWebSocket = () => {
  if (client) {
    client.deactivate();
    client = null;
  }
  suscripciones = [];
};