package ua.kusakabe.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.kusakabe.todolist.entity.Task;
import ua.kusakabe.todolist.entity.User;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByUsername(String username);
}
