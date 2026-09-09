package com.chat.ariana.Controller;

import com.chat.ariana.Model.Amistad;
import com.chat.ariana.services.AmistadService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/amigos")
public class AmistadController {
    private final AmistadService amistadService;

    AmistadController(AmistadService amistadService) {
        this.amistadService = amistadService;
    }

    @GetMapping("/enviadas/{id_usuario}")
    public List<Amistad> obtenerSolicitudesEnviadas(@PathVariable Integer id_usuario) {
        return amistadService.obtenerSolicitudesEnviadas(id_usuario);
    }

    @GetMapping("/recibidas/{id_amigo}")
    public List<Amistad> obtenerSolicitudesRecibidas(@PathVariable Integer id_amigo) {
        return amistadService.obtenerSolicitudesRecibidas(id_amigo);
    }

    @PostMapping("/enviarsoli")
    public Amistad enviarSolicitud(@RequestBody Amistad amistad) {
        return amistadService.enviarSolicitud(amistad);
    }

    @DeleteMapping("/quitarsoli/{id}")
    public void quitarSolicitud(@PathVariable Integer id) {
        amistadService.quitarSolicitud(id);

    }
}
