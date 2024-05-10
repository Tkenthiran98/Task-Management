package com.task.management.dto;

import com.task.management.entities.Task;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDTO {
    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private String status;

    @NotNull
    private String teamMemberName;

    public TaskDTO() {}

    public TaskDTO(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.status = task.getStatus();
    }
}
