package com.chat.ariana.Model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    Integer id_usuario;
    String nombre;
    String email;
    String password;
    LocalDate fecha_union;
    String genero;
    String descripcion;
    String foto;
}

