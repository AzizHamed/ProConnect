package com.braude.ProConnect.controllers;

import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("users")
@CrossOrigin()
@Validated
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/get")
    public ResponseEntity<User> getUser(@RequestParam long userId){
        User user = userService.getUser(userId);
        if(user != null)
            return new ResponseEntity<User>(user, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getAllUsers();
        if(users != null)
            return new ResponseEntity<>(users, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user, BindingResult bindingResult){
        User newUser = userService.createUser(user);
        if(newUser != null)
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
