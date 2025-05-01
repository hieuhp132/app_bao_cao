package myapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import myapp.model.User;
import myapp.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }
    @Bean
    public CommandLineRunner init(UserRepository userRepo, PasswordEncoder encoder) {
        return args -> {
            if (userRepo.findByMaillogin("admin@gmail.com").isEmpty()) {
                User admin = new User();
                admin.setMaillogin("admin@gmail.com");
                admin.setUsername("Admin User");
                admin.setPassword(encoder.encode("123456"));
                admin.setRole("ADMIN");
                userRepo.save(admin);
                System.out.println(" Admin created: admin@gmail.com / 123456");
            } else {
                System.out.println(" Admin user already exists");
            }
        };
    }

    @Bean
    CommandLineRunner run(UserRepository userRepo, PasswordEncoder encoder) {
    return args -> {
        if (userRepo.findByMaillogin("user1@gmail.com").isEmpty()) {
            User user = new User();
            user.setMaillogin("user1@gmail.com");
            user.setUsername("User 1");
            user.setPassword(encoder.encode("user123")); // mật khẩu mã hóa
            user.setRole("USER");
            userRepo.save(user);
            System.out.println("User  created: user1@gmail.com / user123");
        }else{
            System.out.println("User already exists");
        }
    };
}
}
