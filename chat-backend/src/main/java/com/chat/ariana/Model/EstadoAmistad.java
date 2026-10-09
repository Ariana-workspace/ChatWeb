package com.chat.ariana.Model;


import com.fasterxml.jackson.annotation.JsonCreator;

public enum EstadoAmistad {
    pendiente, aceptada, rechazada;

    @JsonCreator
    public static EstadoAmistad fromString(String value) {
        return value == null ? null : EstadoAmistad.valueOf(value.toLowerCase());
    }
}