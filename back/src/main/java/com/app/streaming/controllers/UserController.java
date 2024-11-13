package com.app.streaming.controllers;

import com.app.streaming.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/oauth")
@CrossOrigin(origins = "*")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private AuthService authService;

    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestHeader("browser-id") String browserId, @RequestParam("username") String username, @RequestParam("password") String password) {
        try {
            return ResponseEntity.ok(authService.login(username, password, browserId));
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get-google-redirect-url")
    public String googleLogin(@RequestHeader("browser-id") String browserId) {
        return this.authService.getGoogleRedirect(browserId);
    }

    @GetMapping(value = "/login-google", produces = "application/json")
    public RedirectView googleOauth(@RequestParam String code,
                                    @RequestParam String scope,
                                    @RequestParam String authuser,
                                    @RequestParam String prompt,
                                    HttpServletResponse response) {
        return this.authService.loginGoogle(response, code, scope, authuser, prompt);
    }
}
