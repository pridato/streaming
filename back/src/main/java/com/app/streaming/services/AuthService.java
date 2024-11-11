package com.app.streaming.services;

import com.app.streaming.model.User;
import com.app.streaming.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Función para el logueo de un usuario
     * @param username nombre del usuario
     * @param password contraseña del usuario
     * @return true si el usuario se loguea correctamente, false en caso contrario
     */
    public User login(String username, String password) throws Exception{
        Optional<User> userToCompare = userRepository.findByUsername(username);

        if (userToCompare.isPresent() && userToCompare.get().getPasswordHash().equals(password)) {
            return userToCompare.get();
        }

        throw new Exception("Usuario o contraseña incorrectos");
    }
}
