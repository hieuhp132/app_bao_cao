package myapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import myapp.model.Product;
import myapp.model.User;
import myapp.service.UserService;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/users/create")
    public ResponseEntity<User> userCreate(@RequestBody User user) {
        User saved = userService.createUser(
            user.getUserName(),
            user.getUserEmail(),
            user.getUserRole(),
            user.getUserState()
        );
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
    @PatchMapping("/users/{id}")
    public ResponseEntity<User> updateProduct(@PathVariable Long id, @RequestBody User user) {
        // Cập nhật đơn hàng theo id
        User updatedUser = userService.updateUser(id, user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);  // Trả về đơn hàng đã được cập nhật
        } else {
            return ResponseEntity.notFound().build();  // Nếu không tìm thấy đơn hàng
        }
    }
}
