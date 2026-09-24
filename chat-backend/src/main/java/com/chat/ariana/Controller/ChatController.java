package com.chat.ariana.Controller;

import com.chat.ariana.Model.Mensaje;
import com.chat.ariana.services.ChatService;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.MessageMapping;

@Controller
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public Mensaje recibirMensaje(Mensaje mensaje) {
        System.out.println("RECIBIDO: " + mensaje);
        return chatService.procesarMensaje(mensaje);
    }

}
