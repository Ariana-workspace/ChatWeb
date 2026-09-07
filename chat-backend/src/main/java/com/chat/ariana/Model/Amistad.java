package com.chat.ariana.Model;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Amistad {
     Integer id;
     Integer id_usuario;
     Integer id_amigo;
     private EstadoAmistad estado;
     LocalDate fecha_solicitud;
     LocalDate fecha_respuesta;

}
