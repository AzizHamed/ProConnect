package com.braude.ProConnect.security.providers;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.security.SecurityUser;
import com.braude.ProConnect.security.authentications.FirebaseAuthentication;
import com.braude.ProConnect.security.authentications.SwaggerAuthentication;
import com.braude.ProConnect.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class SwaggerAuthProvider implements AuthenticationProvider {
    private final UserService userService;

    @Autowired
    public SwaggerAuthProvider(UserService userService){
        this.userService = userService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        System.out.println("Security: In class SwaggerAuthProvider");
        var username = authentication.getName().toString();
        var password = (String) authentication.getCredentials();
        if(username.equalsIgnoreCase("admin") && password.equals("Basic YWRtaW46cHJvY29ubmVjdA==")) {
            User user = userService.getUser("admin");
            SecurityUser securityUser = new SecurityUser(user);
            Authentication auth = new SwaggerAuthentication(securityUser, "jwt", securityUser.getAuthorities());
            return auth;

        }
        else{
            throw new ProConnectException("Invalid Swagger Auth");
        }
    }


    @Override
    public boolean supports(Class<?> authentication) {
        return SwaggerAuthentication.class.equals(authentication);
    }
}
