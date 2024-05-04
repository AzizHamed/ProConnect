package com.braude.ProConnect.models.entities;

import com.braude.ProConnect.models.embeddables.Name;
import com.braude.ProConnect.models.enums.AccountStatus;
import com.braude.ProConnect.models.enums.WorkAreas;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    private int numOfRates=0;

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


    @JoinColumn(
            name = "profession_id",
            referencedColumnName = "profession_id"
    )
    @ManyToOne()
    private Profession profession;


//    @ManyToMany()
//    @JoinTable(name = "professional_contractor",
//            joinColumns = @JoinColumn(name = "professional_id"),
//            inverseJoinColumns = @JoinColumn(name = "contractor_id"))
//    private List<User> contractors;

    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus;

    private String photoUrl;





    @Enumerated(EnumType.STRING)
    private WorkAreas workAreas;


//    @JsonIgnore
//    @JsonManagedReference
//    @OneToMany(mappedBy = "receiverUser", fetch = FetchType.LAZY)
//    private List<JobOffer> offersReceived;
//
//
////    @JsonIgnore
////    @JsonManagedReference
//    @OneToMany(mappedBy = "senderUser", fetch = FetchType.LAZY)
//    private List<JobOffer> offersSent;





    public void addRating(int rating){
        setRating(((getRating() * getNumOfRates()) + rating)/(getNumOfRates() + 1));
        setNumOfRates(getNumOfRates() + 1);
    }

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

//    @Override
//    public String toString() {
//        return "User{" +
//                "id='" + id + '\'' +
//                ", name=" + name +
//                ", email='" + email + '\'' +
//                ", accountStatus=" + accountStatus +
//                '}';
//    }
}