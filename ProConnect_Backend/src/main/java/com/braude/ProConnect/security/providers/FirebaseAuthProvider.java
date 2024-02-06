package com.braude.ProConnect.security.providers;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.security.SecurityUser;
import com.braude.ProConnect.security.authentications.FirebaseAuthentication;
import com.braude.ProConnect.services.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class FirebaseAuthProvider implements AuthenticationProvider {
    private final UserService userService;

    @Autowired
    public FirebaseAuthProvider(UserService userService){
        this.userService = userService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        System.out.println("In  " + this.getClass());
        if (!supports(authentication.getClass())) return null;
        String uid = (String) authentication.getPrincipal();
        User user = userService.getUser(uid);
        System.out.println("User: " + user.getEmail());
        SecurityUser securityUser = new SecurityUser(user);
        if (!securityUser.isAccountNonLocked()) {
            throw new ProConnectException(securityUser.getUsername() + " is locked.");
        }
        if (!securityUser.isEnabled()) {
            throw new ProConnectException(securityUser.getUsername() + " is disabled.");
        }
        Authentication auth = new FirebaseAuthentication(securityUser, authentication.getCredentials(), securityUser.getAuthorities());
//            userService.updateLastAccessDate(user);
        return auth;
    }


    @Override
    public boolean supports(Class<?> authentication) {
        return FirebaseAuthentication.class.equals(authentication);
    }
}
