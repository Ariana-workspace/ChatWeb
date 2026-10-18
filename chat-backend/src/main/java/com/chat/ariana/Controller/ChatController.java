package com.chat.ariana.Controller;

import com.chat.ariana.Model.Mensaje;
import com.chat.ariana.services.ChatService;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.MessageMapping;

@Controller
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    public ChatController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat")
    public void recibirMensaje(Mensaje mensaje) {
        Mensaje procesado = chatService.procesarMensaje(mensaje);
        String destino = procesado.getId_chat_directo() != null
                ? "/topic/chat/directo/" + procesado.getId_chat_directo()
                : "/topic/chat/grupo/" + procesado.getId_grupo();

        messagingTemplate.convertAndSend(destino, procesado);
    }

}
