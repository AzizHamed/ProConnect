package com.braude.ProConnect.models.entities;

import com.braude.ProConnect.models.embeddables.Name;
import com.braude.ProConnect.models.enums.AccountStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Date;
import java.util.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @Column(name = "user_id", updatable = false)
    private String id;
    @NotNull
    @Embedded
    private Name name;
    @NotNull
    @Email(message = "Email is not valid.", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
    @NotEmpty(message = "Email cannot be empty.")
    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String phoneNumber;
    private Date dateOfBirth;

    @OneToMany(mappedBy = "reviewer", fetch = FetchType.LAZY)
    private List<Review> reviewsGiven;

    @OneToMany(mappedBy = "reviewedUser", fetch = FetchType.LAZY)
    private List<Review> reviewsReceived;

    private double rating=0;

    private int experience=0;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role>  roles;


    @ManyToMany()
    @JoinTable(name = "professional_contractor",
            joinColumns = @JoinColumn(name = "professional_id"),
            inverseJoinColumns = @JoinColumn(name = "contractor_id"))
    private List<User> contractors;

    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus;


//    @OneToMany()
//    @JoinTable(name = "user_professions",
//            joinColumns = @JoinColumn(name = "user_id" ),
//            inverseJoinColumns = @JoinColumn(name = "profession-id"))
//    private List<Profession> professions;

    //private List<User> workers;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return name.equals(user.name) && email.equals(user.email) && dateOfBirth.equals(user.dateOfBirth) && Objects.equals(roles, user.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, email, dateOfBirth, roles);
    }

    public boolean addRole(Role role) {
        return roles.add(role);
    }
    public boolean removeRole(Role role) {
        return roles.remove(role);
    }
}