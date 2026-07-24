package com.chat.ariana.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Grupo {
    Integer id_grupo;
    String nombre;
    String descripcion;
}
