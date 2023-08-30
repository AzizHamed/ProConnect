package com.braude.ProConnect.services;

import com.braude.ProConnect.models.entities.Role;
import com.braude.ProConnect.repositories.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public void generateRoles(){
        if(roleRepository.findAll().isEmpty())
            roleRepository.saveAll(Role.getAllRoles());
    }

    public List<Role> getRoles() {
        generateRoles();
        return roleRepository.findAll();
    }
}
