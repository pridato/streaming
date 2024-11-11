package com.app.streaming.controllers;

import com.app.streaming.services.AuthService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/oauth")
@CrossOrigin(origins = "*")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private AuthService authService;

    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam("username") String username,@RequestParam("password") String password) {
        try {
            return ResponseEntity.ok(authService.login(username, password));
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get-google-redirect-url")
    public String googleLogin() {
        return this.authService.getGoogleRedirect();
    }

    @GetMapping(value = "/login-google", produces = "application/json")
    public RedirectView googleOauth(@RequestParam String code,
                                    @RequestParam String scope,
                                    @RequestParam String authuser,
                                    @RequestParam String prompt) {
        return this.authService.loginGoogle(code, scope, authuser, prompt);
    }
}
