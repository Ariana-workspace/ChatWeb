package com.chat.ariana.Model;


import com.fasterxml.jackson.annotation.JsonCreator;

public enum EstadoAmistad {
    PENDIENTE, ACEPTADA, RECHAZADA;

    @JsonCreator
    public static EstadoAmistad fromString(String value) {
        return EstadoAmistad.valueOf(value.toUpperCase());
    }
}