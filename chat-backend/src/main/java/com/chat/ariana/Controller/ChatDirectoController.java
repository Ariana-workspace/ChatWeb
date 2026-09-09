package com.chat.ariana.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.ariana.Model.Chat_directo;
import com.chat.ariana.services.ChatDirectoService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/chatdirecto")
public class ChatDirectoController {
    private final ChatDirectoService chatDirectoService;

    ChatDirectoController(ChatDirectoService chatDirectoService) {
        this.chatDirectoService = chatDirectoService;
    }

    @PostMapping ("/crearchat")
    public Chat_directo getMethodName(@PathVariable Chat_directo chat_directo) {
        return chatDirectoService.crearChatDirecto(chat_directo);
    }

    @GetMapping("/buscarchat/{id_usuario}/{id_amigo}")
    public Chat_directo obtenerChatUnico(@PathVariable Integer id_usuario, Integer id_amigo) {
        return chatDirectoService.obtenerChatUnico(id_usuario, id_amigo);
    }

    @DeleteMapping("/eliminarchat/{id_chat_directo}")
    public void eliminarChat(@PathVariable Integer id_chat_directo){
        
    }

}
