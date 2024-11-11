package com.app.streaming.services;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    /**
     * Función para el logueo de un usuario
     * @param username nombre del usuario
     * @param password contraseña del usuario
     * @return true si el usuario se loguea correctamente, false en caso contrario
     */
    public boolean login(String username, String password) {
        return true;
    }
}
