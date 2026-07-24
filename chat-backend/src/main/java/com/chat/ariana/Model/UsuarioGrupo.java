package com.chat.ariana.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioGrupo {
    Integer id_usuario;
    Integer id_grupo;
    LocalDateTime fecha_union;
}
