import { Client } from "@stomp/stompjs";

let cliente = null;
let conectado = false; 
let callbackGlobal = null;

export const conectarWebSocket = () => {
    cliente = new Client(
        {
            brokerURL: "ws://localhost:8080/chat",
            reconnectDelay: 5000,

            onConnect: () => {
                console.log("Conectado al WebSocket");
                conectado = true;

                cliente.subscribe("/topic/chat", (msg) => {
                if (callbackGlobal) {
                    callbackGlobal(JSON.parse(msg.body));
                }})
        },

            onDisconnect: () => {
                console.log("Desconectado del WebSocket");
                conectado = false;
            },
            onStompError: (frame) => {
                console.error("Error STOMP:", frame);
            }
        });
   
    cliente.activate();
   
}
export const suscribirse = (callback) =>{
    callbackGlobal = callback;
}
export const enviarMensaje = (msg) => {
    if (!cliente) return;
    console.log("ENVIANDO:", msg);

    cliente.publish({
        destination: "/app/chat",
        body: JSON.stringify(msg),
    });
};
export const desconectarWebSocket = () =>{
    if (cliente) {
        cliente.deactivate();
        conectado = false;
        cliente = null;
    }
}
