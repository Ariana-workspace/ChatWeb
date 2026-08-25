package com.chat.ariana.Controller;

import com.chat.ariana.Model.Usuario;
import com.chat.ariana.services.UsuarioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    private final UsuarioService usuarioService;

    UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @GetMapping("/{id_usuario}")
    public Usuario obtenerUsuarioPorId(@PathVariable Integer id_usuario){
        return usuarioService.obtenerUsuarioPorId(id_usuario);
    }
}
