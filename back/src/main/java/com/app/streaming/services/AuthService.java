package com.app.streaming.services;

import com.app.streaming.model.User;
import com.app.streaming.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.app.streaming.globals.Globales.*;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private String googleClientBrowserId = "";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RedisService redisService;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Función para el logueo de un usuario
     *
     * @param username  nombre del usuario
     * @param password  contraseña del usuario
     * @param browserId id del navegador
     * @return true si el usuario se loguea correctamente, false en caso contrario
     */
    public User login(String username, String password, String browserId) throws Exception {
        Optional<User> userToCompare = userRepository.findByUsername(username);

        if (userToCompare.isPresent() && userToCompare.get().getPasswordHash().equals(password)) {
            String accessToken = tokenService.generateAccessToken(userToCompare.get().getEmail(), browserId);
            redisService.set(browserId, accessToken);
            logger.info("browser: {}", redisService.get(browserId));
            return userToCompare.get();
        }

        logger.error("Usuario o contraseña aaaa");
        throw new Exception("Usuario o contraseña incorrectos");
    }

    /**
     * metodo para redireccionar a la URL de inicio de sesión de Google
     *
     * @return direccion de url de inicio de sesion de google, su popup
     */
    public String getGoogleRedirect(String browserId) {
        googleClientBrowserId = browserId;
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
             * importante para el redirect lo enviamos otra vez a spring para ver que hacer
             * con el objeto del usuario. Parms importantes a leer
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

    /**
     * Metodo para loguearse con Google.
     * 
     * @param code     Codigo de autorizacion.
     * @param scope    Permisos solicitados.
     * @param authuser Usuario autenticado al utilizar diferentes flujos.
     * @param prompt   Indica si se debe mostrar la pantalla de consentimiento.
     * @return Objeto con el usuario logueado y su token.
     */
    public RedirectView loginGoogle(HttpServletResponse response, String code, String scope, String authuser,
            String prompt) {

        // Creamos una URL para acceder al token que nos habilita el acceso a la
        // información del usuario
        HttpEntity<MultiValueMap<String, String>> request = createRequest(code);
        String accessToken = getAccessToken(request);
        Map<String, Object> userInfo = getUserInfo(accessToken);

        // Generamos el token de acceso para el usuario
        String UserAccessToken = tokenService.generateAccessToken(userInfo.get("email").toString(),
                googleClientBrowserId);

        // Almacenamos el token en Redis
        redisService.set(googleClientBrowserId, UserAccessToken);

        // Establecemos el UserAccessToken en una cookie

        // devolvemos un redirect con los params email y jwt
        return new RedirectView("http://localhost:3000");
    }

    /**
     * metodo para generar request de intercambio de token
     * 
     * @param code -> codigo de autorizacion
     * @return la entidad http creada
     */
    private HttpEntity<MultiValueMap<String, String>> createRequest(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", googleClientId);
        params.add("client_secret", googleClientSecret);
        params.add("redirect_uri", googleRedirectUri);
        params.add("grant_type", "authorization_code");

        return new HttpEntity<>(params, headers);
    }

    /**
     * metodo para obtener el token de acceso a partir del request
     * 
     * @param request -> request creada createRequest
     * @return el token de acceso
     */
    private String getAccessToken(HttpEntity<MultiValueMap<String, String>> request) {
        // tokenUrl => globales
        try {
            ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, request, Map.class);
            Map tokenResponse = response.getBody();
            if (tokenResponse == null || !tokenResponse.containsKey("access_token")) {
                throw new RuntimeException("Error al obtener el token de acceso");
            }
            return (String) tokenResponse.get("access_token");
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
        }

        return "";
    }

    /**
     * metodo para obtener la informacion del usuario a partir del token de acceso
     * 
     * @param accessToken -> token de acceso
     * @return la informacion del usuario
     */
    private Map<String, Object> getUserInfo(String accessToken) {
        HttpHeaders userInfoHeaders = new HttpHeaders();
        userInfoHeaders.setBearerAuth(accessToken);

        HttpEntity<String> userInfoRequest = new HttpEntity<>(userInfoHeaders);

        ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, userInfoRequest,
                Map.class);
        return (Map<String, Object>) userInfoResponse.getBody();
    }

}
