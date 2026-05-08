package com.todolist.backend.Security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtAuthFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Leer el header Authorization
        String authHeader = request.getHeader("Authorization");

        // Comprobar si empieza por "Bearer "
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);   // Extraer el token

            // Validar el token
            if (jwtUtil.validateToken(token)) {
                String username = jwtUtil.extractUsername(token);       // Extraer el username del token
                UserDetails userDetails = userDetailsService.loadUserByUsername(username); // Cargar el usuario para obtener sus roles y permisos
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities()); // Crear un token de autenticación con los detalles del usuario
                SecurityContextHolder.getContext().setAuthentication(authToken); // Establecer el contexto de seguridad para que Spring Security lo reconozca como autenticado
            }
        }
        filterChain.doFilter(request, response);
    }
}
