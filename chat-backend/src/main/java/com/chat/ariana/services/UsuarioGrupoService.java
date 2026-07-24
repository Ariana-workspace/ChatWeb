package com.chat.ariana.services;
import com.chat.ariana.Model.UsuarioGrupo;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class UsuarioGrupoService {
    private final RestClient restClient;

    public UsuarioGrupoService(RestClient.Builder builder){
        this.restClient = builder.build();
    }

    public List<UsuarioGrupo> obtenerUsuarioGrupo(){
        return restClient
                .get()
                .uri("https://arianini.alwaysdata.net/usuarios_grupo.php")
                .retrieve()
                .body(new ParameterizedTypeReference<List<UsuarioGrupo>>() {});
    }



}
