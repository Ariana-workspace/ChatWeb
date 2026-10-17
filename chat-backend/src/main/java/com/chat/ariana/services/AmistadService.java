package com.chat.ariana.services;

import com.chat.ariana.Model.Amistad;
import com.chat.ariana.Model.EstadoAmistad;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class AmistadService {
    private final RestClient restClient;

    public AmistadService(RestClient.Builder builder) {
        this.restClient = builder.build();
    }

    public Amistad enviarSolicitud(Amistad amistad) {
        amistad.setFecha_solicitud(LocalDate.now());
        Map<String, Object> respuesta = restClient
                .post()
                .uri("https://ariworkplace.alwaysdata.net/chat_amistad.php")
                .contentType(MediaType.APPLICATION_JSON)
                .body(amistad)
                .retrieve()
                .body(new ParameterizedTypeReference<Map<String, Object>>() {
                });

        if (respuesta != null && respuesta.get("id") != null) {
            amistad.setId(Integer.valueOf(respuesta.get("id").toString()));
        }
        return amistad;
    }
    public void quitarSolicitud(Integer id_solicitud) {
        String raw = restClient
                .delete()
                .uri("https://ariworkplace.alwaysdata.net/chat_amistad.php?id=" + id_solicitud)
                .retrieve()
                .body(String.class);
        System.out.println("Solicitud: " + raw);
    }
    public Amistad responderSolicitud(Integer id_usuario, Integer id_amigo, EstadoAmistad respuesta){
        List<Amistad> amistad = restClient
                .get()
                .uri("https://ariworkplace.alwaysdata.net/chat_amistad.php?id_usuario="+ id_usuario+ "&id_amigo=" + id_amigo)
                .retrieve()
                .body(new ParameterizedTypeReference<List<Amistad>>() {
                });
        Amistad solicitud = amistad == null ? null : amistad.stream()
                        .filter(a -> a.getEstado() == EstadoAmistad.pendiente)
                        .findFirst()
                                .orElse(null);

        if (solicitud == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No hay una solicitud pendiente");
        }

        solicitud.setEstado(respuesta);
        solicitud.setFecha_respuesta(LocalDate.now());

        System.out.println(solicitud.getId());
        restClient
                .put()
                .uri("https://ariworkplace.alwaysdata.net/chat_amistad.php?id="+solicitud.getId())
                .body(solicitud)
                .retrieve()
                .body(Amistad.class);


        return solicitud;
    }

    public List<Amistad> obtenerSolicitudesEnviadas(Integer id_usuario) {
        return restClient
                .get()
                .uri("https://ariworkplace.alwaysdata.net/chat_amistad.php?id_usuario=" + id_usuario)
                .retrieve()
                .body(new ParameterizedTypeReference<List<Amistad>>() {
                });
    }
    public List<Amistad> obtenerSolicitudesRecibidas(Integer id_amigo) {
        return restClient
                .get()
                .uri("https://ariworkplace.alwaysdata.net/chat_amistad.php?id_amigo=" + id_amigo)
                .retrieve()
                .body(new ParameterizedTypeReference<List<Amistad>>() {
                });
    }
}
