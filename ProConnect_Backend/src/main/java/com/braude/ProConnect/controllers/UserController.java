package com.braude.ProConnect.controllers;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.models.entities.UserProfession;
import com.braude.ProConnect.requests.UpdatePersonalInfoRequest;
import com.braude.ProConnect.requests.UpdateProfessionsRequest;
import com.braude.ProConnect.models.enums.WorkAreas;
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
@CrossOrigin("*")
@Validated
@Tag(name = "Users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/exists")
    public ResponseEntity<Boolean> userExists(@RequestParam String userId){
        return new ResponseEntity<>(userService.exists(userId), HttpStatus.OK);
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

    @PostMapping(value = "update-personal-info")
    public ResponseEntity<User> updatePersonalInfo(@Valid @RequestBody UpdatePersonalInfoRequest updatePersonalInfoRequest){
        try {
            return ResponseEntity.ok(userService.updatePersonalInfo(updatePersonalInfoRequest));
        } catch (ProConnectException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping(value = "update-professions")
    public ResponseEntity<User> updateProfessions(@Valid @RequestBody UpdateProfessionsRequest updateProfessionsRequest){
        try {
            return ResponseEntity.ok(userService.updateProfessions(updateProfessionsRequest));
        } catch (ProConnectException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping(value = "update-profile")
    public ResponseEntity<User> updateProfile(@RequestBody UpdateProfileRequest updateProfileRequest){
        try {
            return ResponseEntity.ok(userService.updateProfile(updateProfileRequest));
        } catch (ProConnectException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping(value = "get-user-professions")
    public ResponseEntity<List<UserProfession>> getUserProfessions(@RequestParam(required = false) String userId) {
        List<UserProfession> userProfessions = userId != null ? userService.getUserProfessions(userId) : userService.getUserProfessions();
        if(userProfessions != null)
            return new ResponseEntity<>(userProfessions, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping(value = "users-num")
    public int getAllUsersNumber(){
        return userService.getAllUsersNumber();
    }


    @PutMapping(value = "RateUser")
    public void RateUser (String userId, int rating){
        userService.rateUser(userId,rating);
    }

    @GetMapping(value = "FindByWorkArea")
    public ResponseEntity<List<User>> getAllUsersByWorkArea (@RequestParam WorkAreas workAreas){
        List<User> users = userService.findByWorkAreas(workAreas);
        if(users==null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(users,HttpStatus.OK);
    }


    @GetMapping(value = "UserByProfession")
    public ResponseEntity<List<User>> findUserByProfession(@RequestParam String professionName, @RequestParam WorkAreas workAreas){
        List<User> users = userService.findUserByProfession(professionName, workAreas);
        if(users==null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(users,HttpStatus.OK);
    }



    @GetMapping(value = "usersByEmails")
    public ResponseEntity<List<User>> getUsersByEmail(@RequestParam String [] emails){
        List<User> users = userService.getUsersByEmails(emails);
        System.out.println("users ::: " + users);
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    @PostMapping(value = "addRating")
    public ResponseEntity<Boolean> addRating(@RequestParam String userId, @RequestParam int rating){
        userService.addRating(userId, rating);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

}
