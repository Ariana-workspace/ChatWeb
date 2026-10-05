package com.chat.ariana.services;

import com.chat.ariana.Model.Grupo;
import com.chat.ariana.Model.Mensaje;
import com.chat.ariana.Model.Usuario;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ChatService {

    private final UsuarioService usuarioService;
    private final MensajesService mensajesService;
    private final GrupoService grupoService;

    public ChatService(UsuarioService usuarioService,
            MensajesService mensajesService,
            GrupoService grupoService) {
        this.usuarioService = usuarioService;
        this.mensajesService = mensajesService;
        this.grupoService = grupoService;
    }

    public Mensaje procesarMensaje(Mensaje mensaje) {
        mensaje.setFecha(LocalDateTime.now());
        mensajesService.agregarMensaje(mensaje);
        return mensaje;
    }
}
