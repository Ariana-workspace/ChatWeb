package com.chat.ariana.Controller;

import com.chat.ariana.Model.Grupo;
import com.chat.ariana.Model.UsuarioGrupo;
import com.chat.ariana.services.GrupoService;
import com.chat.ariana.services.UsuarioGrupoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/grupos")
public class GrupoController {
    private final GrupoService grupoService;
    private final UsuarioGrupoService usuarioGrupoService;

    GrupoController(GrupoService grupoService, UsuarioGrupoService usuarioGrupoService){
        this.grupoService = grupoService;
        this.usuarioGrupoService = usuarioGrupoService;
    }

    @GetMapping
    public List<Grupo> listar(){
        return grupoService.obtenerGrupos();
    }

    @GetMapping("/{id_usuario}")
    public Grupo buscar(@PathVariable Integer id_usuario){
        return  grupoService.obtenerGrupoPorId(id_usuario);
    }

    @GetMapping("/usuario/{id_usuario}")
    public List<UsuarioGrupo> listarGruposDelUsuario(@PathVariable Integer id_usuario){
        return usuarioGrupoService.obtenerGrupoPorIdUsuario(id_usuario);
    }
}
