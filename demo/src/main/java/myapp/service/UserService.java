package myapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import myapp.model.Product;
import myapp.model.User;
import myapp.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepo;

    @Autowired
    public UserService(UserRepository userRepo){
        this.userRepo = userRepo;
    }

    public User createUser(String userName, String userEmail, String userRole, String userState){
        User user = new User(userName, userEmail,userRole, userState);
        return userRepo.save(user);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public boolean deleteUser(Long id) {
        if (userRepo.existsById(id)) {
            userRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public User updateUser(Long id, User user) {
        Optional<User> existingUser = userRepo.findById(id);
        if (existingUser.isPresent()) {
            User response = existingUser.get();  // Sử dụng User, không phải Product
            response.setUserName(user.getUserName());
            response.setUserEmail(user.getUserEmail());
            response.setUserRole(user.getUserRole());
            response.setUserState(user.getUserState());
            return userRepo.save(response);  // Cập nhật và lưu lại User
        }
        return null;  // Trả về null nếu không tìm thấy User
    }
}
