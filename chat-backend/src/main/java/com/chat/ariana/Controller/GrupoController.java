package com.chat.ariana.Controller;

import com.chat.ariana.Model.Grupo;
import com.chat.ariana.services.GrupoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/grupos")
public class GrupoController {
    private final GrupoService grupoService;

    GrupoController(GrupoService grupoService){
        this.grupoService = grupoService;
    }

    @GetMapping
    public List<Grupo> listar(){
        return grupoService.obtenerGrupos();
    }

    @GetMapping("/{id}")
    public Grupo buscar(@PathVariable Integer id){
        return  grupoService.obtenerGrupoPorId(id);
    }

}
