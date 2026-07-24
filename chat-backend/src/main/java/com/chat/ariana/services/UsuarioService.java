package com.chat.ariana.services;

import com.chat.ariana.Model.Usuario;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.core.ParameterizedTypeReference;
import java.util.List;

@Service
public class UsuarioService {
        private final RestClient restClient;

        public UsuarioService(RestClient.Builder builder) {
                this.restClient = builder.build();
        }

        public List<Usuario> obtenerUsuarios() {
                return restClient
                                .get()
                                .uri("https://arianini.alwaysdata.net/usuarios_chat.php")
                                .retrieve()
                                .body(new ParameterizedTypeReference<List<Usuario>>() {
                                });
        }

        public Usuario obtenerUsuarioPorId(Integer id_usuario) {
                return restClient
                                .get()
                                .uri("https://arianini.alwaysdata.net/usuarios_chat.php?id_usuario=" + id_usuario)
                                .retrieve()
                                .body(Usuario.class);
        }

        public String login(String email, String password) {
                return restClient
                                .get()
                                .uri("https://arianini.alwaysdata.net/usuarios_chat.php?email={email}&password={password}",
                                                email,
                                                password)
                                .retrieve()
                                .body(String.class);
        }

}
