package com.todolist.backend.Mapper;

import com.todolist.backend.DTOs.TaskDTO;
import com.todolist.backend.Entities.Task;

public class TaskMapper {

    public static TaskDTO toDTO(Task task) {
        return new TaskDTO(
                task.getName(),
                task.getDescription(),
                task.getStartDate(),
                task.getEndDate(),
                task.getStatus()
        );
    }

    public static Task toEntity(TaskDTO taskDTO) {
        Task task = new Task();
        task.setName(taskDTO.getName());
        task.setDescription(taskDTO.getDescription());
        task.setStartDate(taskDTO.getStartDate());
        task.setEndDate(taskDTO.getEndDate());
        task.setStatus(taskDTO.getStatus());
        return task;
    }

}
