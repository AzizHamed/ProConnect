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

    @NotNull(message = "Role name cannot be null.")
    @NotEmpty(message = "Role name cannot be empty.")
    @Column(unique = true)
    private String name;

    @NotNull(message = "Role code cannot be null.")
    @NotEmpty(message = "Role code cannot be empty.")
    @Size(min = 1, max = 3, message = "Role code must be between 1 and 3 characters.")
    @Column(unique = true, length = 3)
    private String code;

    public static final Role ADMIN = new Role("Admin", "ADM");
    public static final Role HOMEOWNER = new Role("Homeowner", "HO");
    public static final Role PROFESSIONAL = new Role("Professional", "PRO");
    public static final Role CONTRACTOR = new Role("Contractor", "CON");
    public static final Role WORKER = new Role("Worker", "WOR");

    public Role() {
    }

    public Role(long id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code.toUpperCase();
    }

    public Role(String name, String code) {
        this.name = name;
        this.code = code.toUpperCase();
    }


    public static List<Role> getDefaultRoles() {
        List<Role> roles = new ArrayList<>();
        roles.addAll(List.of(new Role[]{ADMIN, HOMEOWNER, PROFESSIONAL, CONTRACTOR, WORKER}));
        return roles;
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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return name.equals(role.name) && code.equals(role.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, code);
    }

    @Override
    public String toString() {
        return name;
    }
}
