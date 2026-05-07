package com.todolist.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GeneraPass {
    public static void main(String[] args) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println(passwordEncoder.encode("123456"));
    }
}
