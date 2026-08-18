package com.chat.ariana.Controller;

import com.chat.ariana.Model.Mensaje;
import com.chat.ariana.services.GrupoService;
import com.chat.ariana.services.MensajesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mensajes")
public class MensajeController {
    private final MensajesService mensajesService;
    private final GrupoService grupoService;

    MensajeController(MensajesService mensajesService, GrupoService grupoService){
        this.mensajesService = mensajesService;
        this.grupoService = grupoService;
    }

    @GetMapping
    public List<Mensaje> listarMensajes(){
        return mensajesService.obtenerMensajes();
    }

    @GetMapping("/grupo/{id_grupo}")
    public List<Mensaje> listarPorGrupos(@PathVariable Integer id_grupo){
        return mensajesService.obtenerMensajes().stream()
                .filter(m -> m.getId_grupo().equals(id_grupo))
                .toList();

    }
}
