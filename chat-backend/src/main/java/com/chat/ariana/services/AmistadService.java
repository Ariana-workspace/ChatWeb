package com.chat.ariana.services;


import com.chat.ariana.Model.Amistad;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class AmistadService {
    private final RestClient restClient;

    public AmistadService(RestClient.Builder builder){
        this.restClient = builder.build();
    }

    public Amistad enviarSolicitud(Amistad amistad){
        amistad.setFecha_solicitud(LocalDate.now());
        Map<String, Object> respuesta= restClient
                .post()
                .uri("https://ariworkplace.alwaysdata.net/chat_amistad.php")
                 .contentType(MediaType.APPLICATION_JSON)
                 .body(amistad)
                 .retrieve()
                 .body(new ParameterizedTypeReference<Map<String, Object>>() {});

        Integer nuevoId = (Integer) respuesta.get("id");
        amistad.setId(nuevoId);
        System.out.println("RESPUESTA PHP USUARIO: " + respuesta);
        return amistad;
    }

    public void quitarSolicitud(Integer id_solicitud){
        String raw= restClient
                .delete()
                .uri("https://ariworkplace.alwaysdata.net/chat_amistad.php?id="+ id_solicitud)
                .retrieve()
                .body(String.class);
    }

    public List<Amistad> obtenerSolicitudesEnviadas(Integer id_usuario){
        return restClient
                .get()
                .uri("https://ariworkplace.alwaysdata.net/chat_amistad.php?id_usuario="+ id_usuario)
                .retrieve()
                .body(new ParameterizedTypeReference<List<Amistad>>() {});
    }

    public List<Amistad> obtenerSolicitudesRecibidas(Integer id_amigo){
        return restClient
                .get()
                .uri("https://ariworkplace.alwaysdata.net/chat_amistad.php?id_amigo="+ id_amigo)
                .retrieve()
                .body(new ParameterizedTypeReference<List<Amistad>>() {});
    }

}
