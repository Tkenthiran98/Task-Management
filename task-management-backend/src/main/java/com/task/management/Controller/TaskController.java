package com.task.management.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.task.management.entities.Task;
import com.task.management.services.TaskService;
import com.task.management.util.EndpointBundle;
import com.task.management.util.ValidationMessages;

import java.util.List;

@RestController
@RequestMapping(EndpointBundle.TASKMANAGEMENT)
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping(EndpointBundle.GET_ALL_TASKS)
    public List<Task> getAllTasks(@RequestParam(required = false) String status, 
                                  @RequestParam(required = false) String teamMemberName) {
        return taskService.getAllTasks(status, teamMemberName);
    }

    @GetMapping(EndpointBundle.GET_TASK_BY_ID)
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @PostMapping(EndpointBundle.CREATE_TASK)
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PutMapping(EndpointBundle.UPDATE_TASK_BY_ID)
    public String updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task updatedTask = taskService.updateTask(id, taskDetails);
        return updatedTask != null ? ValidationMessages.UPDATE_SUCCESS : null;
    }

    @PutMapping(EndpointBundle.UPDATE_STATUS_BY_ID)
    public String updateTaskStatus(@PathVariable Long id, @RequestParam String status) {
        taskService.updateTaskStatus(id, status);
        return ValidationMessages.UPDATE_SUCCESS;
    }

    @DeleteMapping(EndpointBundle.DELETE_TASK_BY_ID)
    public String deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ValidationMessages.DELETE_SUCCESS;
    }
}
