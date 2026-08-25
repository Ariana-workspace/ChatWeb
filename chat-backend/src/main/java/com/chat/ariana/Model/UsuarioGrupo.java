package com.chat.ariana.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioGrupo {
    Integer id_usuario;
    Integer id_grupo;
    LocalDate fecha_union;
}
