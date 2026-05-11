package com.todolist.backend.exceptions;

public class UserAlreadyExistsException extends RuntimeException {
    
    public UserAlreadyExistsException(String message) {
        super("User already exists: " + message);
    }
}
