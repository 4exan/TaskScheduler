package ua.kusakabe.todolist.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.kusakabe.todolist.dto.TaskDto;
import ua.kusakabe.todolist.service.TaskService;

@RestController
@RequestMapping("/task")
@AllArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/get-all")
    public ResponseEntity<TaskDto> getAllTasks(@RequestHeader("Authorization") String header){
        return ResponseEntity.ok(taskService.getAllTasks(header));
    }

    @PostMapping("/create")
    public ResponseEntity<TaskDto> createNewTask(@RequestHeader("Authorization") String header, @RequestBody TaskDto req){
        return ResponseEntity.ok(taskService.createTask(header, req));
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<TaskDto> editTask(@RequestHeader("Authorization") String header, @PathVariable long id, @RequestBody TaskDto req){
        return ResponseEntity.ok(taskService.updateTask(header, id, req));
    }

    @DeleteMapping("/remove/{id}")
    public void deleteTask(@PathVariable long id){
        taskService.deleteTask(id);
    }

}
