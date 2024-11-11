package com.app.streaming.services;

import com.app.streaming.model.User;
import com.app.streaming.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.app.streaming.globals.Globales.googleClientId;
import static com.app.streaming.globals.Globales.googleRedirectUri;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Función para el logueo de un usuario
     *
     * @param username nombre del usuario
     * @param password contraseña del usuario
     * @return true si el usuario se loguea correctamente, false en caso contrario
     */
    public User login(String username, String password) throws Exception {
        Optional<User> userToCompare = userRepository.findByUsername(username);

        if (userToCompare.isPresent() && userToCompare.get().getPasswordHash().equals(password)) {
            return userToCompare.get();
        }

        throw new Exception("Usuario o contraseña incorrectos");
    }

    /**
     * metodo para redireccionar a la URL de inicio de sesión de Google
     *
     * @return direccion de url de inicio de sesion de google, su popup
     */
    public String getGoogleRedirect() {
        String googleAuthorizationUrl = "https://accounts.google.com/o/oauth2/auth" +
                "?client_id=" + googleClientId +
                "&redirect_uri=" + googleRedirectUri +
                "&response_type=code" +
                "&scope=openid%20email%20profile";

        // lo devolvemos como formato json correcto a través de objectMapper
        Map<String, String> response = new HashMap<>();
        response.put("url", googleAuthorizationUrl);

        try {
            /**
             * importante para el redirect lo enviamos otra vez a spring para ver que hacer con el objeto del usuario. Parms importantes a leer
             * code: codigo de autorizacion
             * scope: permisos solicitados
             * authuser: usuario autenticado al utilizar diferentes flujos
             * prompt: indica si se debe mostrar la pantalla de consentimiento
             *
             */
            return objectMapper.writeValueAsString(response);
        } catch (Exception e) {
            return null;
        }
    }
}
