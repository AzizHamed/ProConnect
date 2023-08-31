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
        if(roleRepository.count() == 0)
            roleRepository.saveAll(Role.getDefaultRoles());
    }

    public List<Role> getRoles() {
        generateRoles();
        return roleRepository.findAll();
    }

    public Role addRole(Role role) {
        return roleRepository.save(role);
    }
}
