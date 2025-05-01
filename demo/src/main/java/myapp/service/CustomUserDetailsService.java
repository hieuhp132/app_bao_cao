package myapp.service;

import myapp.model.User;
import myapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String maillogin) throws UsernameNotFoundException {
        User user = userRepository.findByMaillogin(maillogin)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Không tìm thấy người dùng: " + maillogin));

        return new org.springframework.security.core.userdetails.User(
                user.getMaillogin(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
        );
    }
}