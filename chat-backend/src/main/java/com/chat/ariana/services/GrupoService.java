package com.chat.ariana.services;

import com.chat.ariana.Model.Grupo;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class GrupoService {
    private final RestClient restClient;

    public GrupoService(RestClient.Builder builder){
        this.restClient = builder.build();
    }

    public List<Grupo> obtenerGrupos(){
        return restClient
                .get()
                .uri("https://ariworkplace.alwaysdata.net/grupo_chat.php")
                .retrieve()
                .body(new ParameterizedTypeReference<List<Grupo>>() {});
    }

    public Grupo obtenerGrupoPorId(Integer id_grupo){
        return restClient
                .get()
                .uri("https://ariworkplace.alwaysdata.net/grupo_chat.php?id_grupo="+id_grupo)
                .retrieve()
                .body(Grupo.class);
    }
}
