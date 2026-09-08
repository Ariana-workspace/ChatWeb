package com.chat.ariana.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chat_directo {
    Integer id_chat_directo;
    Integer id_usuario;
    Integer id_amigo;
    LocalDate fecha_creacion;

}
