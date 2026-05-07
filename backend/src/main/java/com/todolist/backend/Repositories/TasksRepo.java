package com.todolist.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todolist.backend.Entities.Task;

public interface TasksRepo extends JpaRepository<Task, Long> {

}
