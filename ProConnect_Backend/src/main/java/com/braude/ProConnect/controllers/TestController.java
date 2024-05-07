package com.braude.ProConnect.controllers;

import com.braude.ProConnect.models.embeddables.Name;
import com.braude.ProConnect.models.entities.Role;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.services.RoleService;
import com.braude.ProConnect.services.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@RestController
@CrossOrigin
@Hidden
public class TestController {
    private final RoleService roleService;
    private final UserService userService;

    public TestController(UserService userService, RoleService roleService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @GetMapping("init")
    public void init()
    {
        List<Role> savedRoles = roleService.generateRoles();
        if(savedRoles == null)
            savedRoles = roleService.getRoles();
        List<User> users = new ArrayList<>();
        User user;
        List<Role> roles = new ArrayList<>();
        roles.add(savedRoles.get(0));
        roles.add(savedRoles.get(3));
        user = User.builder().name(new Name("User", "1")).email("user1@gmail.com").phoneNumber("0521111111").dateOfBirth(Date.valueOf("2001-1-1")).roles(roles).build();
        users.add(user);
        roles = new ArrayList<>();
        roles.add(savedRoles.get(1));
        roles.add(savedRoles.get(4));
        user = User.builder().name(new Name("User", "2")).email("user2@gmail.com").phoneNumber("0522222222").dateOfBirth(Date.valueOf("2002-2-2")).roles(roles).build();
        users.add(user);
        roles = new ArrayList<>();
        roles.add(savedRoles.get(2));
        user = User.builder().name(new Name("User", "3")).email("user3@gmail.com").phoneNumber("0523333333").dateOfBirth(Date.valueOf("2003-3-3")).roles(roles).build();
        users.add(user);
        userService.createUsers(users);
    }

}
