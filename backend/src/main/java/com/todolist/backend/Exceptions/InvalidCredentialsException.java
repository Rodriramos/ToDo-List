package com.todolist.backend.exceptions;

public class InvalidCredentialsException extends RuntimeException {
    
    public InvalidCredentialsException(String message) {
        super("Invalid credentials: " + message);
    }
}
