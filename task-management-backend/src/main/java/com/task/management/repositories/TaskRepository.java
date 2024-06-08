package com.task.management.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.task.management.entities.Task;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(String status);
    List<Task> findByTeamMemberName(String teamMemberName);
    List<Task> findByStatusAndTeamMemberName(String status, String teamMemberName);
}
