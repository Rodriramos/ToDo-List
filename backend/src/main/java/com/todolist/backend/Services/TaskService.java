package com.todolist.backend.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todolist.backend.DTOs.TaskDTO;
import com.todolist.backend.Entities.Task;
import com.todolist.backend.Mapper.TaskMapper;
import com.todolist.backend.Repositories.TasksRepo;

@Service
public class TaskService {
    @Autowired
    private TasksRepo taskRepository;

    public List<TaskDTO> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream().map(TaskMapper::toDTO).toList();
    }

    public TaskDTO getTaskById(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            return TaskMapper.toDTO(task.get());
        } else {
            throw new RuntimeException("Task not found with id: " + id);
        }
    }

    public TaskDTO createTask(TaskDTO taskDTO) {
        var task = TaskMapper.toEntity(taskDTO);
        var savedTask = taskRepository.save(task);
        return TaskMapper.toDTO(savedTask);
    }

    public TaskDTO updateTask(Long id, TaskDTO taskDetails) {
        Optional<Task> existingTask = taskRepository.findById(id);

        if (!existingTask.isPresent()) {
            throw new RuntimeException("Task not found with id: " + id);
        }

        var task = existingTask.get();
        
        task.setName(taskDetails.getName());
        task.setDescription(taskDetails.getDescription());
        task.setStartDate(taskDetails.getStartDate());
        task.setEndDate(taskDetails.getEndDate());
        task.setStatus(taskDetails.getStatus());

        var updatedTask = taskRepository.save(task);
        return TaskMapper.toDTO(updatedTask);
    }

    public TaskDTO updateTaskStatus(Long id, String status) {
        Optional<Task> existingTask = taskRepository.findById(id);

        if (!existingTask.isPresent()) {
            throw new RuntimeException("Task not found with id: " + id);
        }

        var task = existingTask.get();
        task.setStatus(status);

        var updatedTask = taskRepository.save(task);
        return TaskMapper.toDTO(updatedTask);
    }

    public void deleteTask(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            taskRepository.delete(task.get());
        } else {
            throw new RuntimeException("Task not found with id: " + id);
        }
    }
}
