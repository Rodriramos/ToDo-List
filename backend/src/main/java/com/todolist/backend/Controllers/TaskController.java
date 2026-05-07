package com.todolist.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todolist.backend.DTOs.TaskDTO;
import com.todolist.backend.Services.TaskService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/all")
    public List<TaskDTO> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public TaskDTO getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PostMapping("/create")
    public TaskDTO createTask(@RequestBody TaskDTO task) {
        return taskService.createTask(task);
    }
    
    @PutMapping("/update/{id}")
    public TaskDTO updateTask(@PathVariable Long id, @RequestBody TaskDTO task) {
        return taskService.updateTask(id, task);
    }

    @PatchMapping("/update-status/{id}")
    public TaskDTO updateTaskStatus(@PathVariable Long id, @RequestParam String status) {
        return taskService.updateTaskStatus(id, status);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
