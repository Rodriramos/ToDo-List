package com.todolist.backend.services;

import java.util.List;

import com.todolist.backend.dtos.TaskDTO;

public interface TaskService {

    List<TaskDTO> getAllTasks();
    TaskDTO getTaskById(Long id);
    TaskDTO createTask(TaskDTO taskDTO);
    TaskDTO updateTask(Long id, TaskDTO taskDTO);
    TaskDTO updateTaskStatus(Long id, String status);
    void deleteTask(Long id);
}
