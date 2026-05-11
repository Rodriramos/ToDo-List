package com.todolist.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todolist.backend.entities.Task;
import com.todolist.backend.entities.User;

public interface TasksRepo extends JpaRepository<Task, Long> {
    
    List<Task> findByUser(User user);
}
