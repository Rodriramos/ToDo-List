package com.todolist.backend.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todolist.backend.Entities.Task;
import com.todolist.backend.Entities.User;

public interface TasksRepo extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
