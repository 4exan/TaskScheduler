package ua.kusakabe.todolist.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Size;
import lombok.Data;
import ua.kusakabe.todolist.entity.Task;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class TaskDto {

    private int statusCode;
    private String message;

    private String username;
    private String title;
    private String description;
    private String priority;
    private boolean completed;

    Task task;
    List<Task> taskList;
}
