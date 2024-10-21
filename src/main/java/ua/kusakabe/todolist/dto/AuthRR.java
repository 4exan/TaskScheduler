package ua.kusakabe.todolist.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import ua.kusakabe.todolist.entity.Task;
import ua.kusakabe.todolist.entity.User;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class AuthRR {

    private int statusCode;
    private String message;
    private String token;

    private String username;
    private String password;
    private String email;
    private String role;

    private User user;

    private List<User> userList;
}
