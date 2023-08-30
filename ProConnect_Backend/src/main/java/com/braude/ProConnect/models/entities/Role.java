package com.braude.ProConnect.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id", updatable = false)
    private long id;

    @NotNull
    @NotEmpty
    @Column(unique = true)
    private String name;

    @NotNull
    @NotEmpty
    @Size(min = 1, max = 3)
    @Column(unique = true)
    private String code;

    public Role() {
    }

    public Role(long id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code.toUpperCase();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code.toUpperCase();
    }

    public static List<Role> getAllRoles(){
        List<Role> roles = new ArrayList<>();
        String[][] roleData = {
                {"Admin", "ADM"},
                {"Homeowner", "HO"},
                {"Professional", "PRO"},
                {"Contractor", "CON"},
                {"Worker", "WOR"}
        };

        for (String[] data : roleData) {
            Role role = new Role();
            role.setName(data[0]);
            role.setCode(data[1]);
            roles.add(role);
        }
        return roles;
    }
}
