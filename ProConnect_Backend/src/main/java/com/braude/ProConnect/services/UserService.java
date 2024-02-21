package com.braude.ProConnect.services;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.Role;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.models.enums.AccountStatus;
import com.braude.ProConnect.repositories.RoleRepository;
import com.braude.ProConnect.repositories.UserRepository;
import com.braude.ProConnect.requests.UpdateProfileRequest;
import com.braude.ProConnect.security.SecurityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public static User getAuthorizedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ProConnectException("User not authenticated.");
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof SecurityUser) {
            User user = ((SecurityUser) principal).getUser();
            return user;
        }
        throw new ProConnectException("User not authenticated.");
    }

    public User createUser(User user){
        if(!userRepository.existsById(user.getId())){
            user.setAccountStatus(AccountStatus.SETUP);
            return userRepository.save(user);
        }
        return null;
    }

    /**
     * Returns the User with the given userId if found, otherwise returns null.
     * @param userId
     * @return {@link User} with the given userId, or null if not foundl.
     */
    public User getUser(String userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent() ? user.get() : null;
    }

    public boolean exists(String userId){
        return userRepository.existsById(userId);
    }
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public boolean addRole(String userId, long roleId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if(!optionalUser.isPresent())
            throw new ProConnectException("User not found.");
        Optional<Role> role = roleRepository.findById(roleId);
        if(!role.isPresent())
            throw new ProConnectException("Role not found.");
        User user = optionalUser.get();
        if(!user.addRole(role.get()))
            throw new ProConnectException("User already has this role.");
        userRepository.save(user);
        return true;
    }

    public List<User> createUsers(List<User> users) {
        List<User> newUsers = new ArrayList<>();
        for (User user : users) {
            newUsers.add(createUser(user));
        }
        return newUsers;
    }

    public UpdateProfileRequest updateProfile(UpdateProfileRequest request){
        User user = getAuthorizedUser();
        if(user == null)
            throw new ProConnectException("User not found.");
        user.setName(request.getName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRoles(request.getRoles());
        user.setAccountStatus(AccountStatus.ACTIVE);
        user = userRepository.save(user);
        return new UpdateProfileRequest(user.getName(), user.getPhoneNumber(), user.getAccountStatus(), user.getRoles());
    }
}
