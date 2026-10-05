package com.chat.ariana.services;

import com.chat.ariana.Model.Mensaje;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class MensajesService {
    private final RestClient restClient;

    public MensajesService(RestClient.Builder builder){
        this.restClient = builder.build();
    }

    public List<Mensaje> obtenerMensajes(){
        return restClient
                .get()
                .uri("https://ariworkplace.alwaysdata.net/mensajes.php")
                .retrieve()
                .body(new ParameterizedTypeReference<List<Mensaje>>() {});
    }
    public Mensaje obtenerMensajePorId(Integer id_mensaje){
        return restClient
                .get()
                .uri("https://ariworkplace.alwaysdata.net/mensajes.php?id_mensaje="+id_mensaje)
                .retrieve()
                .body(Mensaje.class);
    }

    @Async
    public void agregarMensaje(Mensaje mensaje) {
        try {
            restClient
                    .post()
                    .uri("https://ariworkplace.alwaysdata.net/mensajes.php")
                    .body(mensaje)
                    .retrieve()
                    .toBodilessEntity();
            System.out.println("Hilo: " + Thread.currentThread().getName());
        } catch (Exception e) {
            System.err.println("No se pudo guardar el mensaje: " + e.getMessage());
        }
    }


}
