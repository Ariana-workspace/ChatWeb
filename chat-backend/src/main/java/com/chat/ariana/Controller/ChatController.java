package com.chat.ariana.Controller;

import com.chat.ariana.Model.Mensaje;
import com.chat.ariana.services.ChatService;
import com.chat.ariana.services.MensajesService;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.MessageMapping;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    private final ChatService chatService;
    private final MensajesService mensajesService;

    public ChatController(ChatService chatService, MensajesService mensajesService){
        this.chatService = chatService;
        this.mensajesService = mensajesService;
    }

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public Mensaje recibirMensaje(Mensaje mensaje) {
        System.out.println("RECIBIDO: " + mensaje);
        mensajesService.agregarMensaje(mensaje);
        return chatService.procesarMensaje(mensaje);

    }

}
