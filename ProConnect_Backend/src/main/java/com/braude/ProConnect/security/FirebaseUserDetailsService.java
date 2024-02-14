package com.braude.ProConnect.security;

import com.braude.ProConnect.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * Responsible for creating UserDetails objects when loading a user by username (in this case, the user's Firebase uid)
 */
public class FirebaseUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;


    /**
     * Load the user by its Firebase uid
     * @param username The user's Firebase uid
     * @return {@link SecurityUser} containing the loaded user
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userService.getUser(username);
        if(user == null) throw new UsernameNotFoundException("Username (Firebase uid) " + username + " not found!");
        return new SecurityUser(user);
    }
}
