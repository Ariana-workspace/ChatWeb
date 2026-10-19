package com.chat.ariana.Controller;

import org.springframework.web.bind.annotation.*;

import com.chat.ariana.Model.Chat_directo;
import com.chat.ariana.services.ChatDirectoService;

@RestController
@RequestMapping("/chatdirecto")
public class ChatDirectoController {
    private final ChatDirectoService chatDirectoService;

    ChatDirectoController(ChatDirectoService chatDirectoService) {
        this.chatDirectoService = chatDirectoService;
    }

    @PostMapping("/crearchat")
    public Chat_directo crearChat_directo(@RequestBody Chat_directo chat_directo) {
        return chatDirectoService.crearChatDirecto(chat_directo);
    }

    @GetMapping("/buscarchat/{id_usuario}/{id_amigo}")
    public Chat_directo obtenerChatUnico(@PathVariable Integer id_usuario, @PathVariable Integer id_amigo) {
        return chatDirectoService.obtenerChatUnico(id_usuario, id_amigo);
    }

    @DeleteMapping("/eliminarchat/{id_chat_directo}")
    public void eliminarChat(@PathVariable Integer id_chat_directo) {
        chatDirectoService.eliminarChatUnico(id_chat_directo);
    }

}
