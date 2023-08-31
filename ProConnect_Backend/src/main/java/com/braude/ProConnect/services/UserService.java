package com.braude.ProConnect.services;

import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public User getUser(long id) {
        Optional<User> user = userRepository.findById(id);
        return user.isPresent() ? user.get() : null;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
}
