package com.todolist.backend.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.todolist.backend.DTOs.TaskDTO;
import com.todolist.backend.Entities.Task;
import com.todolist.backend.Entities.User;
import com.todolist.backend.Exceptions.TaskNotFoundException;
import com.todolist.backend.Exceptions.UnauthorizedAccessException;
import com.todolist.backend.Exceptions.UserNotFoundException;
import com.todolist.backend.Mapper.TaskMapper;
import com.todolist.backend.Repositories.TasksRepo;
import com.todolist.backend.Repositories.UsersRepo;

@Service
public class TaskService {

    private final TasksRepo taskRepository;
    private final UsersRepo usersRepo;

    public TaskService(TasksRepo taskRepository, UsersRepo usersRepo) {
        this.taskRepository = taskRepository;
        this.usersRepo = usersRepo;
    }

    private User getAuthenticatedUser() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    return usersRepo.findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
}

    public List<TaskDTO> getAllTasks() {
        User user = getAuthenticatedUser();
        List<Task> tasks = taskRepository.findByUser(user);
        return tasks.stream().map(TaskMapper::toDTO).toList();
    }

    public TaskDTO getTaskById(Long id) {
        User user = getAuthenticatedUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        if (!task.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("Unauthorized to access this task");
        }
        return TaskMapper.toDTO(task);
    }

    public TaskDTO createTask(TaskDTO taskDTO) {
        User user = getAuthenticatedUser();
        Task task = TaskMapper.toEntity(taskDTO);
        task.setUser(user);
        Task savedTask = taskRepository.save(task);
        return TaskMapper.toDTO(savedTask);
    }

    public TaskDTO updateTask(Long id, TaskDTO taskDetails) {
        User user = getAuthenticatedUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("Unauthorized to update this task");
        }
        
        if (taskDetails.getName() != null) task.setName(taskDetails.getName());
        if (taskDetails.getDescription() != null) task.setDescription(taskDetails.getDescription());
        if (taskDetails.getStartDate() != null) task.setStartDate(taskDetails.getStartDate());
        if (taskDetails.getEndDate() != null) task.setEndDate(taskDetails.getEndDate());
        if (taskDetails.getStatus() != null) task.setStatus(taskDetails.getStatus());

        var updatedTask = taskRepository.save(task);
        return TaskMapper.toDTO(updatedTask);
    }

    public TaskDTO updateTaskStatus(Long id, String status) {
        User user = getAuthenticatedUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("Unauthorized to update this task");
        }

        task.setStatus(status);

        var updatedTask = taskRepository.save(task);
        return TaskMapper.toDTO(updatedTask);
    }

    public void deleteTask(Long id) {
        User user = getAuthenticatedUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("Unauthorized to delete this task");
        }

        taskRepository.delete(task);
    }
}

