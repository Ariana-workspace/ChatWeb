package com.chat.ariana.services;

import com.chat.ariana.Model.Mensaje;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import tools.jackson.databind.ObjectMapper;

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

    public Mensaje agregarMensaje(Mensaje mensaje) {
        System.out.println("Fecha en Java antes de mandar: " + mensaje.getFecha());

        String raw = restClient
                .post()
                .uri("https://ariworkplace.alwaysdata.net/mensajes.php")
                .body(mensaje)
                .retrieve()
                .body(String.class);

        System.out.println("RESPUESTA PHP MENSAJE: " + raw);

        return mensaje;
    }


}
