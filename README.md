# 📝 Todo List API - Spring Boot

A simple Todo List application developed as my first backend project using Java and Spring Boot.

The main goal of this project was to learn how to build a complete REST API following good backend development practices, including authentication, authorization, database persistence, DTO usage, exception handling, and OAuth2 integration.

---

# 🚀 Features

## ✅ Task Management

Authenticated users can:

- Create tasks
- View their tasks
- Update tasks
- Delete tasks

Each user only has access to their own tasks.

---

# 🔐 Authentication & Authorization

One of the main focuses of this project was implementing different authentication methods using Spring Security.

The API supports:

## 🔑 Classic Authentication

Users can authenticate using:

- Username + password
- Email + password

Passwords are securely encrypted before being stored in the database.

Authentication is handled using JWT (JSON Web Tokens).

---

## 🌐 OAuth2 Login

Users can also sign in using external providers:

- Google OAuth2
- GitHub OAuth2

After successful authentication, the backend generates a JWT token so the API keeps working with stateless authentication.

---

# 🛠️ Technologies Used

## Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- OAuth2 Client
- MySQL
- Maven

## Frontend

A small frontend prototype was developed using React and Vite to demonstrate the correct functionality of the REST API and authentication flows.

- React
- Vite

---

# 📁 Project Structure

```txt
ToDo-List
├── backend
    ├── auth
    ├── controllers
    ├── dtos
    ├── entities
    ├── exceptions
    ├── mappers
    ├── repositories
    ├── security
    └── services
├── frontend

# ⚙️ Execution Modes

The application supports different execution modes using Spring profiles.

This allows separating local development configuration from production or future deployment environments.

---

## 📌 Available Profiles

### 🔧 Local Mode

Used for local development and testing.

Example:

```bash
./mvnw spring-boot:run "-Dspring-boot.run.profiles=local"
