package ua.kusakabe.todolist.service;

import lombok.AllArgsConstructor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import ua.kusakabe.todolist.dto.AuthRR;
import ua.kusakabe.todolist.repository.UserRepository;

@SpringBootTest
@AllArgsConstructor
public class UserServiceTest {

    private final UserRepository userRepository;

    AuthRR testUser;

    @Test
    public void saveUserTest(){

    }

}
