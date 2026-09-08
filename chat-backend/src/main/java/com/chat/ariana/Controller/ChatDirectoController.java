package com.chat.ariana.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.ariana.services.ChatDirectoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController 
@RequestMapping("/chatdirecto")
public class ChatDirectoController {
    private final ChatDirectoService chatDirectoService;

    ChatDirectoController(ChatDirectoService chatDirectoService){
        this.chatDirectoService = chatDirectoService;
    }
    @GetMapping("/")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
}
