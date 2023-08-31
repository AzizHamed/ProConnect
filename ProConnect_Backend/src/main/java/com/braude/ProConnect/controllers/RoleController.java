package com.braude.ProConnect.controllers;

import com.braude.ProConnect.models.entities.Role;
import com.braude.ProConnect.services.RoleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("roles")
@CrossOrigin()
@Validated
public class RoleController {
    private final RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<Role>> getAllRoles(){
        List<Role> roles = roleService.getRoles();
        if(roles != null)
            return new ResponseEntity<>(roles, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Role> createRole(@Valid @RequestBody Role role) {
        Role newRole = roleService.addRole(role);
        return new ResponseEntity<>(newRole, HttpStatus.OK);

    }
}
