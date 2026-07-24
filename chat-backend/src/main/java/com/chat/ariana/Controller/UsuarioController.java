package com.chat.ariana.Controller;

import com.chat.ariana.Model.LoginRequest;
import com.chat.ariana.Model.Usuario;
import com.chat.ariana.services.UsuarioService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return usuarioService.login(
                request.getEmail(),
                request.getPassword()
        );
    }
}
