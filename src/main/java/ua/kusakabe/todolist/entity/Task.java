package ua.kusakabe.todolist.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    @Size(min = 3, max = 200)
    private String title;
    @Size(min = 3, max = 200)
    private String description;
    private String priority;
    private boolean completed;

}
