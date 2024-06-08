package com.task.management.services;

 
import java.util.List;
import java.util.Optional;

import com.task.management.entities.Task;
 
public interface TaskService {
    List<Task> getAllTasks();
    Optional<Task> getTaskById(Long id);
    Task createTask(Task task);
    Task updateTask(Long id, Task taskDetails);
    void deleteTask(Long id);
    void updateTaskStatus(Long Id, String status);
    List<Task> getAllTasks(String status, String teamMemberName);

}
