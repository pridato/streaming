package com.app.streaming.services;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import static com.app.streaming.globals.Globales.secretKey;

@Service
public class TokenService {

    /**
     * Genera un token de acceso con la información del usuario y el navegador
     * @param userEmail email del usuario
     * @param browserId id del navegador
     * @return token de acceso
     */
    public String generateAccessToken(String userEmail, String browserId) {
        long now = System.currentTimeMillis();
        Date expiration = new Date(now + 86400000);  // 24 horas

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", userEmail);
        claims.put("browserId", browserId);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(now))
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}
