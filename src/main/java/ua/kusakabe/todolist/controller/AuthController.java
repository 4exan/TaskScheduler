package ua.kusakabe.todolist.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ua.kusakabe.todolist.dto.AuthRR;
import ua.kusakabe.todolist.service.UserService;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final UserService userService;
    private AuthenticationManager authenticationManager;

    @PostMapping("/registration")
    public ResponseEntity<AuthRR> registerUser(@RequestBody AuthRR req){
        return ResponseEntity.ok(userService.saveUser(req));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthRR> loginUser(@RequestBody AuthRR req){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
        if(authentication.isAuthenticated()) {
            return ResponseEntity.ok(userService.loginUser(req));
        } else {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    @PostMapping("/validate")
    public void validateToken(@RequestHeader("Authorization") String header){
        userService.validateToken(header);
    }

}
