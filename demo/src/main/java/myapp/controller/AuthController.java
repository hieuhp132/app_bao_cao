package myapp.controller;

import myapp.payload.AuthRequest;
import myapp.payload.JwtResponse;
import myapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Đăng nhập, trả về token nếu thành công
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody AuthRequest authRequest) {
        String token = authService.login(authRequest.getMaillogin(), authRequest.getPassword());
        return ResponseEntity.ok(new JwtResponse(token));
    }
}
