package com.app.streaming.globals;

import io.github.cdimascio.dotenv.Dotenv;

public class Globales {

    static Dotenv dotenv = Dotenv.configure().load();

    public static final String googleClientId = dotenv.get("GOOGLE_CLIENT_ID");
    public static final String googleClientSecret = dotenv.get("GOOGLE_CLIENT_SECRET");
    public static final String googleRedirectUri = "http://localhost:8080/oauth/login-google";
    public static final String tokenUrl = "https://oauth2.googleapis.com/token";
    public static final String userInfoUrl = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json";
}
