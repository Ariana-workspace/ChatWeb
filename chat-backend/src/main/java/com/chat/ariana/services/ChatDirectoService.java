package com.chat.ariana.services;

import com.chat.ariana.Model.Chat_directo;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDate;
import java.util.Map;

@Service
public class ChatDirectoService {
    private final RestClient restClient;

    ChatDirectoService(RestClient.Builder builder) {
        this.restClient = builder.build();
    }

    public Chat_directo crearChatDirecto(Chat_directo chat_directo) {
        chat_directo.setFecha_creacion(LocalDate.now());
        Map<String, Object> respuesta = restClient
                .post()
                .uri("https://ariworkplace.alwaysdata.net/chat_directo.php")
                .contentType(MediaType.APPLICATION_JSON)
                .body(chat_directo)
                .retrieve()
                .body(new ParameterizedTypeReference<Map<String, Object>>() {
                });
        Integer nuevoId = (Integer) respuesta.get("id");
        chat_directo.setId_chat_directo(nuevoId);
        System.out.println("Respuesta PHP Usuario: " + respuesta);
        return chat_directo;
    }
    public Chat_directo obtenerChatUnico(Integer id_usuario, Integer id_amigo){
        Integer ids[] = {id_usuario, id_amigo};
        Chat_directo unicoChat = restClient
        .get()
        .uri("https://ariworkplace.alwaysdata.net/chat_directo.php")
        .body()
        .retrieve()
        ..
        return
    }

}
