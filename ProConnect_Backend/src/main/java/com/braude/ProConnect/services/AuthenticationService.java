package com.braude.ProConnect.services;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.security.SecurityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserService userService;

    @Autowired
    public AuthenticationService(UserService userService) {
        this.userService = userService;
    }

    public User getAuthorizedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ProConnectException("User not authenticated.");
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof SecurityUser) {
            User securityUser = ((SecurityUser) principal).getUser();
            User user = userService.getUser(securityUser.getId());
            return user;
        }
        throw new ProConnectException("User not authenticated.");
    }
}
