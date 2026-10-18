import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
let cliente = null;
let conectado = false; 
let callbackGlobal = null;
let id_chat = null;
let suscripciones = []

const activarSuscripcion = (s) =>{
    s.sub = cliente.subscribe(s.destino, (frame) => {
        s.callback(JSON.parse(frame.body));
    })
}

export const conectarWebSocket = () => {
    if(cliente) return;
    cliente = new Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/chat"),
        reconnectDelay:5000,
        onConnect:() =>{
            console.log("Conectado al WebSocket");
            suscripciones.forEach(activarSuscripcion);
        },
        onStompError: (frame) => console.error("Error STOMP:",frame),
    });

    cliente.activate();
   
}
export function suscribirse(tipo, id, onMensaje){
    const s = {destino: `/topic/chat/${tipo}/${id}`, callback:onMensaje}
}
export function enviarMensaje({ id_usuario, contenido, id_grupo = null, id_chat_directo = null }) {
  cliente.publish({
    destination: "/app/chat",
    body: JSON.stringify({ id_usuario, contenido, id_grupo, id_chat_directo }),
  });
}
export const desconectarWebSocket = () =>{
    if (cliente) {
        cliente.deactivate();
        conectado = false;
        cliente = null;
    }
}
