package com.braude.ProConnect.services;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.Role;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.repositories.RoleRepository;
import com.braude.ProConnect.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public User createUser(User user){
        if(!userRepository.existsById(user.getId()))
            return userRepository.save(user);
        return null;
    }

    /**
     * Returns the User with the given id if found, otherwise returns null.
     * @param id
     * @return
     */
    public User getUser(String userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent() ? user.get() : null;
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
}
