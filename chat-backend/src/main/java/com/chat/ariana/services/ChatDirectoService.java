package com.chat.ariana.services;

import com.chat.ariana.Model.Chat_directo;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import java.time.LocalDate;
import java.util.List;
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

    public Chat_directo obtenerChatUnico(Integer id_usuario, Integer id_amigo) {
        List<Chat_directo> unicoChat = restClient
                .get()
                .uri("https://ariworkplace.alwaysdata.net/chat_directo.php?id_usuario=" + id_usuario + "&id_amigo="
                        + id_amigo)
                .retrieve()
                .body(new ParameterizedTypeReference<List<Chat_directo>>() {
                });
        return unicoChat == null || unicoChat.isEmpty() ? null : unicoChat.get(0);
    }

    public void eliminarChatUnico(Integer id_chat_directo) {
        String raw = restClient
                .delete()
                .uri("https://ariworkplace.alwaysdata.net/chat_directo.php?id=" + id_chat_directo)
                .retrieve()
                .body(String.class);
        System.out.println("Solicitud: " + raw);
    }

}
