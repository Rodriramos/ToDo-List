package com.todolist.backend.Exceptions;

public class PasswordMismatchException extends RuntimeException {
    public PasswordMismatchException(String message) {
        super("Password mismatch: " + message);
    }
}
