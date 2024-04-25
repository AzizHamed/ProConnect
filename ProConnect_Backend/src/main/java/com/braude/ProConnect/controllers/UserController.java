package com.braude.ProConnect.controllers;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.requests.UpdateProfileRequest;
import com.braude.ProConnect.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/get")
    public ResponseEntity<User> getUser(@RequestParam String userId){
        User user = userService.getUser(userId);
        if(user != null)
            return new ResponseEntity<User>(user, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/get-all")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getAllUsers();
        if(users != null)
            return new ResponseEntity<>(users, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user){
        User newUser = userService.createUser(user);
        if(newUser != null)
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/create-users")
    public ResponseEntity<List<User>> createUsers(@Valid @RequestBody List<User> users){
        List<User> newUsers = userService.createUsers(users);
        if(newUsers != null)
            return new ResponseEntity<>(newUsers, HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "add-role")
    public ResponseEntity<Boolean> addRole(@RequestParam String userId, @RequestParam long roleId){
        if(userService.addRole(userId, roleId))
            return ResponseEntity.ok(true);
        throw new ProConnectException("Failed to add role to user.");
    }

    @PostMapping(value = "update-profile")
    public ResponseEntity<UpdateProfileRequest> updateProfile(@Valid @RequestBody UpdateProfileRequest updateProfileRequest){
        try {
            return ResponseEntity.ok(userService.updateProfile(updateProfileRequest));
        } catch (ProConnectException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping(value = "users-num")
    public int getAllUsersNumber(){
        return userService.getAllUsersNumber();
    }

//    @PutMapping(value = "add-profession")
//    public void addProfession(String userId, String professionName ){
//         userService.addProfession(userId,professionName);
//    }

//    @GetMapping(value = "Profession")
//    public List<User> findUserByProfession(String professionId){
//        return userService.findByProfession(professionId);
//    }

//    @GetMapping(value = "usersByEmails")
//    public ResponseEntity<List<User>> getUsersByEmail(@RequestParam String [] emails){
//        List<User> users = userService.getUsersByEmails(emails);
//        return new ResponseEntity<>(users,HttpStatus.OK);
//    }
//
//
//    @GetMapping(value = "userByEmail")
//    public ResponseEntity<User> getUserByEmail(@RequestParam String email){
//        User user = userService.getUserByEmail(email);
//        if(user==null)
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        return new ResponseEntity<>(user,HttpStatus.OK);
//    }

}
