package com.braude.ProConnect.controllers;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.services.UserServicesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
@CrossOrigin()
@Validated
public class UserController {
    private final UserServicesService userServicesService;

    @Autowired
    public UserController(UserServicesService userServicesService) {
        this.userServicesService = userServicesService;
    }

    @GetMapping(value = "/get")
    public ResponseEntity<User> getUser(@RequestParam long userId){
        User user = userServicesService.getUser(userId);
        if(user != null)
            return new ResponseEntity<User>(user, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userServicesService.getAllUsers();
        if(users != null)
            return new ResponseEntity<>(users, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user){
        User newUser = userServicesService.createUser(user);
        if(newUser != null)
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/create-users")
    public ResponseEntity<List<User>> createUsers(@Valid @RequestBody List<User> users){
        List<User> newUsers = userServicesService.createUsers(users);
        if(newUsers != null)
            return new ResponseEntity<>(newUsers, HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "addRole")
    public ResponseEntity<Boolean> addRole(@RequestParam long userId, @RequestParam long roleId){
        if(userServicesService.addRole(userId, roleId))
            return ResponseEntity.ok(true);
        throw new ProConnectException("Failed to add role to user.");
    }
}
