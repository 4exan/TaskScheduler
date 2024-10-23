package ua.kusakabe.todolist.service;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ua.kusakabe.todolist.dto.TaskDto;
import ua.kusakabe.todolist.entity.Task;
import ua.kusakabe.todolist.repository.TaskRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskService {

    private final JwtService jwtService;
    private final TaskRepository taskRepository;
    private final static Logger LOGGER = LoggerFactory.getLogger(TaskService.class);

    public TaskDto getAllTasks(String header){
        TaskDto res = new TaskDto();
        String token = header.substring(7);
        String bearerUsername = jwtService.extractUsername(token);
        try {
            List<Task> taskList = taskRepository.findAllByUsername(bearerUsername);
            if(!taskList.isEmpty()){
                LOGGER.info("Loaded all tasks!");
                res.setStatusCode(200);
                res.setTaskList(taskList);
            } else {
                LOGGER.warn("Task list is empty!");
                res.setStatusCode(404);
                res.setMessage("Task list is empty!");
            }
        } catch (Exception e) {
            LOGGER.error("Error while getting all tasks -> {}", e.getMessage());
            res.setStatusCode(500);
            res.setMessage(e.getMessage());
        }
        return res;
    }

    public TaskDto createTask(String header, TaskDto req){
        TaskDto res = new TaskDto();
        String token = header.substring(7);
        String bearerUsername = jwtService.extractUsername(token);
        try{
            Task toSave = new Task();
            toSave.setUsername(bearerUsername);
            toSave.setTitle(req.getTitle());
            toSave.setDescription(req.getDescription());
            toSave.setPriority(req.getPriority());
            toSave.setCompleted(false);
            Task result = taskRepository.save(toSave);
            if(result.getId() > 0){
                LOGGER.info("Task created successfully!");
                res.setStatusCode(200);
                res.setMessage("Task created successfully!");
            } else {
                LOGGER.warn("Error while creating task!");
            }
        } catch (Exception e) {
            LOGGER.error("Error while creating task -> {}", e.getMessage());
            res.setStatusCode(500);
            res.setMessage(e.getMessage());
        }
        return res;
    }

    public TaskDto updateTask(String header, long id, TaskDto req){
        checkIsOwnerOfTask(header, id);
        TaskDto res = new TaskDto();
        try{
            Task toUpdate = taskRepository.findById(id).orElseThrow(()-> new RuntimeException("No such task in repository!"));
            toUpdate.setTitle(req.getTitle());
            toUpdate.setDescription(req.getDescription());
            toUpdate.setPriority(req.getPriority());
            toUpdate.setCompleted(req.isCompleted());
            Task result = taskRepository.save(toUpdate);
            if(result.getId() > 0){
                LOGGER.info("Task updated successfully!");
                res.setStatusCode(200);
                res.setMessage("Task updated successfully!");
            } else {
                LOGGER.warn("Error while updating task!");
            }
        } catch (Exception e) {
            LOGGER.error("Error while updating task -> {}", e.getMessage());
            res.setStatusCode(500);
            res.setMessage(e.getMessage());
        }
        return res;
    }

    private void checkIsOwnerOfTask(String header, long id) {
        String token = header.substring(7);
        String bearerUsername = jwtService.extractUsername(token);
        Task task = taskRepository.findById(id).orElse(null);
        if(!task.getUsername().equals(bearerUsername)){
            throw new RuntimeException("User is not owner of task!");
        }
    }

    public void deleteTask(long id){
        TaskDto res = new TaskDto();
        try{
            taskRepository.deleteById(id);
        } catch (Exception e) {
            LOGGER.error("Error while deleting task -> {}", e.getMessage());
            res.setStatusCode(500);
            res.setMessage(e.getMessage());
        }
    }

    public TaskDto toggleComplete(String header, long taskId) {
        TaskDto res = new TaskDto();
        checkIsOwnerOfTask(header, taskId);
        try{
            Task toUpdate = taskRepository.findById(taskId).orElseThrow(()-> new RuntimeException("No such task in repository!"));
            toUpdate.setCompleted(!toUpdate.isCompleted());
            LOGGER.info(toUpdate.toString());
            Task result = taskRepository.save(toUpdate);
            if(result.getId() > 0){
                LOGGER.info("Task completed successfully!");
                res.setStatusCode(200);
                res.setMessage("Task completed successfully!");
            } else {
                LOGGER.warn("Error while complete task!");
            }
        } catch (Exception e){
            LOGGER.error("Error while completing task -> {}", e.getMessage());
            res.setStatusCode(500);
            res.setMessage(e.getMessage());
        }
        return res;
    }
}
