package com.todolist.backend.Exceptions;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super("Invalid credentials: " + message);
    }

}
