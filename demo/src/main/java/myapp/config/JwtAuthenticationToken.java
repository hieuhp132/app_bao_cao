package myapp.config;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;

public class JwtAuthenticationToken extends UsernamePasswordAuthenticationToken {

    public JwtAuthenticationToken(Object principal) {
        super(principal, null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
