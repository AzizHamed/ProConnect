package com.braude.ProConnect.models.entities;

import com.braude.ProConnect.models.embeddables.Name;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", updatable = false)
    private long id;
    @NotNull
    @Embedded
    private Name name;
    @NotNull
    @Email(message = "Email is not valid.", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
    @NotEmpty(message = "Email cannot be empty.")
    @Column(unique = true)
    private String email;
    private String phoneNumber;
    private Date dateOfBirth;


    @OneToMany(mappedBy = "reviewer", fetch = FetchType.LAZY)
    private List<Review> reviewsGiven;

    @OneToMany(mappedBy = "reviewedUser", fetch = FetchType.LAZY)
    private List<Review> reviewsReceived;

    @OneToMany(mappedBy = "user")
    List<UserSkill> userSkills;


    @ManyToMany()
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<Role> roles;
    //private List<User> workers;

    public User() {
    }

    public User(long id, Name name, String email, String phoneNumber, Date dateOfBirth, List<Review> reviewsGiven,
                List<Review> reviewsReceived, List<UserSkill> userSkills, Set<Role> roles) {//, List<User> workers) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.reviewsGiven = reviewsGiven;
        this.reviewsReceived = reviewsReceived;
        this.userSkills = userSkills;
        this.roles = roles;
        //this.workers = workers;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Name getName() {
        return name;
    }

    public void setName(Name name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public List<Review> getReviewsGiven() {
        return reviewsGiven;
    }

    public void setReviewsGiven(List<Review> reviewsGiven) {
        this.reviewsGiven = reviewsGiven;
    }

    public List<Review> getReviewsReceived() {
        return reviewsReceived;
    }

    public void setReviewsReceived(List<Review> reviewsReceived) {
        this.reviewsReceived = reviewsReceived;
    }

    public List<UserSkill> getUserSkills() {
        return userSkills;
    }

    public void setUserSkills(List<UserSkill> userSkills) {
        this.userSkills = userSkills;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id && name.equals(user.name) && email.equals(user.email) && phoneNumber.equals(user.phoneNumber) && dateOfBirth.equals(user.dateOfBirth) && Objects.equals(reviewsGiven, user.reviewsGiven) && Objects.equals(reviewsReceived, user.reviewsReceived) && Objects.equals(userSkills, user.userSkills) && Objects.equals(roles, user.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email, phoneNumber, dateOfBirth, reviewsGiven, reviewsReceived, userSkills, roles);
    }
}