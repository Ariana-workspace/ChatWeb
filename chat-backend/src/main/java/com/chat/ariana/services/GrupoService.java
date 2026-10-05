package com.chat.ariana.services;

import com.chat.ariana.Model.Grupo;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class GrupoService {
    private final RestClient restClient;
    String URL = "https://ariworkplace.alwaysdata.net/grupo_chat.php";

    public GrupoService(RestClient.Builder builder){
        this.restClient = builder.build();
    }

    public List<Grupo> obtenerGrupos(){
        return restClient
                .get()
                .uri(URL)
                .retrieve()
                .body(new ParameterizedTypeReference<List<Grupo>>() {});
    }


    public Grupo obtenerGrupoPorId(Integer id_grupo){
        List<Grupo> grupos = restClient.get()
                .uri(URL + "?id_grupo=" + id_grupo)
                .retrieve()
                .body(new ParameterizedTypeReference<List<Grupo>>() {});

        return grupos.isEmpty() ? null : grupos.get(0);
    }
    public Grupo crearGrupo(Grupo grupo){
        Grupo grupito = restClient
                .post()
                .uri(URL)
                .body(grupo)
                .retrieve()
                .body(Grupo.class);
        return grupito;
    }
}
