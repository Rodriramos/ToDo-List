package com.todolist.backend.exceptions;

public class PasswordMismatchException extends RuntimeException {
    
    public PasswordMismatchException(String message) {
        super("Password mismatch: " + message);
    }
}
