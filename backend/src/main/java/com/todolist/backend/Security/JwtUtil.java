package com.todolist.backend.Security;

import org.springframework.stereotype.Component;

import org.springframework.beans.factory.annotation.Value;

@Component
public class JwtUtil {
    
    @Value("${jwt.secret}")
    private String secretKey;
    
    @Value("${jwt.expiration}")
    private Long expirationTime;
}
