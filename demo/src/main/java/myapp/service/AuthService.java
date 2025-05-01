package myapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import myapp.config.JwtUtils;
import myapp.model.User;
import myapp.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserRepository userRepository;
    // Xác thực và tạo JWT token
    public String login(String emaillogin, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(emaillogin, password)
        );
        org.springframework.security.core.userdetails.User userDetails =
            (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
            User user = userRepository.findByMaillogin(emaillogin).get();
            String username = user.getUsername(); // Tên người dùng (khác email)
            String role = user.getRole(); //
            // Nếu bạn có fullName trong database, bạn có thể lấy từ đó
            
            return jwtUtils.generateToken(emaillogin, username, role); 
    }
}
