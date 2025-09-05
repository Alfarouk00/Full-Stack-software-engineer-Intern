package com.example.items.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()               // ⚡ Enable CORS for Spring Security
            .csrf().disable()           // Disable CSRF for dev/API
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()  // Allow all requests in dev
            );

        return http.build();
    }
}
