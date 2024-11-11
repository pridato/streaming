package com.app.streaming.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(request -> request.requestMatchers(
                        new AntPathRequestMatcher("/oauth/**")).permitAll())
                .authorizeHttpRequests(request -> request.requestMatchers(new
                                AntPathRequestMatcher("/**"))
                        .authenticated()

                )
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }
}
