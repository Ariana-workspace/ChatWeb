package com.chat.ariana.Controller;

import com.chat.ariana.Model.Usuario;
import com.chat.ariana.services.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @GetMapping
    public List<Usuario> listar(){
        return usuarioService.obtenerUsuarios();
    }
    @GetMapping("/buscar")
    public List<Usuario> buscarUsuarios(@RequestParam String texto){
        return usuarioService.buscarUsuario(texto);
    }
}
