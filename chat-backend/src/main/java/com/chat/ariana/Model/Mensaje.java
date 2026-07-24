package com.chat.ariana.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mensaje {
    Integer id_mensaje;
    Integer id_grupo;
    Integer id_usuario;
    String contenido;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime fecha;
}
