package com.chat.ariana.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    Integer id_usuario;
    String nombre;
    String email;
    String password;
    LocalDateTime fecha_union;
    String genero;
    String descripcion;
}

