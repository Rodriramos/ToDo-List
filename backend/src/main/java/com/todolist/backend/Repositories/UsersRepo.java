package com.todolist.backend.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todolist.backend.Entities.User;

public interface UsersRepo extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

}
