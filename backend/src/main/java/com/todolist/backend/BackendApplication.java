package com.todolist.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.todolist.backend.Entities.Task;
import com.todolist.backend.Entities.User;
import com.todolist.backend.Repositories.TasksRepo;
import com.todolist.backend.Repositories.UsersRepo;

import java.util.List;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	@Autowired TasksRepo tasksRepo;
	@Autowired UsersRepo usersRepo;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("ToDo List Backend is running...");
		List<Task> tasks = tasksRepo.findAll();
		tasks.stream().forEach(System.out::println);
		List<User> users = usersRepo.findAll();
		users.stream().forEach(System.out::println);
	}
	

}
