package com.task.management.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.management.entities.Task;
import com.task.management.repositories.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public List<Task> getAllTasks(String status, String teamMemberName) {
        if (status != null && teamMemberName != null) {
            return taskRepository.findByStatusAndTeamMemberName(status, teamMemberName);
        } else if (status != null) {
            return taskRepository.findByStatus(status);
        } else if (teamMemberName != null) {
            return taskRepository.findByTeamMemberName(teamMemberName);
        } else {
            return taskRepository.findAll();
        }
    }

    @Override
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        task.setTeamMemberName(taskDetails.getTeamMemberName());
        return taskRepository.save(task);
    }

    @Override
    public void updateTaskStatus(Long id, String status) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with ID: " + id));
        task.setStatus(status);
        taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
