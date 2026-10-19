import { Client } from "@stomp/stompjs";
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
    const s = {destino: `/topic/chat/${tipo}/${id}`, callback:onMensaje, sub:null};
    suscripciones.push(s);
    
    if(cliente && cliente.connected) activarSuscripcion(s);
    // devuelve una función para cancelar solo esta suscripción
    return () => {
        if(s.sub) s.sub.unsubscribe();
        suscripciones = suscripciones.filter((xd) => xd !== s );
    }
}

export function enviarMensaje({ id_usuario, contenido, id_grupo = null, id_chat_directo = null }) {
    if(!cliente || !cliente.connected) {
        console.warn("Todavía no hay conexión, mensaje no enviado");
        return;
    }
  cliente.publish({
    destination: "/app/chat",
    body: JSON.stringify({ id_usuario, contenido, id_grupo, id_chat_directo }),
  });
}
export const desconectarWebSocket = () =>{
    if (cliente) {
        cliente.deactivate();
        cliente = null;
    }
    suscripciones = [];
}
