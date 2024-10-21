package ua.kusakabe.todolist.service;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.kusakabe.todolist.dto.AuthRR;
import ua.kusakabe.todolist.entity.User;
import ua.kusakabe.todolist.repository.UserRepository;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final static Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    public AuthRR saveUser(AuthRR req) {
        AuthRR res = new AuthRR();
        try{
            User toSave = new User();
            if(req.getUsername() != null && req.getPassword() != null && req.getEmail() != null) {
                toSave.setUsername(req.getUsername());
                toSave.setPassword(passwordEncoder.encode(req.getPassword()));
                toSave.setEmail(req.getEmail());
                toSave.setRole("USER");
            } else {
                LOGGER.error("Invalid credentials!");
                throw new RuntimeException("Invalid credentials!");
            }
            User result = userRepository.save(toSave);
            if(result.getId() > 0) {
                LOGGER.info("User successfully saved!");
                res.setStatusCode(200);
                res.setMessage("User has been saved!");
                res.setUser(result);
            } else {
                LOGGER.warn("User save failed!");
                res.setStatusCode(400);
                res.setMessage("User save failed!");
            }
        }catch (Exception e){
            LOGGER.error("Error while saving user ->", e);
            res.setStatusCode(500);
            res.setMessage(e.getMessage());
        }
        return res;
    }

    public AuthRR loginUser(AuthRR req) {
        AuthRR res = new AuthRR();
        try{
            String token = jwtService.generateToken(req);
            if(token != null) {
                LOGGER.info("User successfully logged in!");
                res.setStatusCode(200);
                res.setMessage("User logged in successfully!");
                res.setToken(token);
            } else {
                LOGGER.warn("User failed to login!");
                res.setStatusCode(400);
                res.setMessage("User login failed!");
            }
        }catch (Exception e){
            LOGGER.error("Error while logging user ->", e);
            res.setStatusCode(500);
            res.setMessage(e.getMessage());
        }
        return res;
    }

    public void validateToken(String header) {
        String token = header.substring(7);
        try {
            User tokenBearer = userRepository.findByUsername(jwtService.extractUsername(token)).orElseThrow(() -> new RuntimeException("No such user in database!"));
            jwtService.validateToken(token, tokenBearer.getUsername());
        } catch (Exception e) {
            throw new RuntimeException("Invalid token!");
        }
    }

}
