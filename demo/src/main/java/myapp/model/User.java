package myapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data // Lombok tự động tạo getter và setter cho tất cả các trường
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    private String role; // VD: "ROLE_USER", "ROLE_ADMIN"

    public User() {
        // Constructor mặc định
    }
}
