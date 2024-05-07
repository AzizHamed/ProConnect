package com.braude.ProConnect.models.entities;

import com.braude.ProConnect.models.embeddables.Name;
import com.braude.ProConnect.models.enums.AccountStatus;
import com.braude.ProConnect.models.enums.WorkAreas;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Date;
import java.time.LocalDate;
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
    @JsonIgnore
    private List<Review> reviewsGiven;

    @OneToMany(mappedBy = "reviewedUser", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Review> reviewsReceived;
    @Transient
    private float averageRating;
    @Transient
    private int ratingsCount;
    @Transient
    private double experience;

    private double rating=0;
    private int numOfRates=0;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles;


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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<UserProfession> userProfessions;

    @Enumerated(EnumType.STRING)
    private WorkAreas workAreas;

    public double getExperience() {
        if(userProfessions == null || userProfessions.isEmpty())
            return 0;

        UserProfession userProfession = userProfessions.get(0);
        LocalDate startDate = userProfession.getStartDate();
        if(startDate == null) return 0;
        LocalDate now = LocalDate.now();
        // Calculate difference in years between now and startDate as a double
        return now.getYear() - startDate.getYear();
    }

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
        int numOfRates1 = getNumOfRates();
        setRating(((getRating() * numOfRates1) + rating)/(numOfRates1 + 1));
        setNumOfRates(numOfRates1 + 1);
    }
    public void removeRating(int rating) {
        int numOfRates1 = getNumOfRates();
        if(numOfRates1 == 0)
            return;
        if(numOfRates1 == 1){
            setRating(0);
            setNumOfRates(0);
            return;
        }
        setRating(((getRating() * numOfRates1) - rating)/(numOfRates1 - 1));
        setNumOfRates(numOfRates1 - 1);
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

    @Override
    public Object clone() throws CloneNotSupportedException {
        User clonedUser = new User();
        clonedUser.setId(this.id);
        clonedUser.setName(new Name(this.name.getFirstName(), this.name.getLastName())); // Assuming Name is immutable
        clonedUser.setEmail(this.email);
        clonedUser.setPhoneNumber(this.phoneNumber);
        clonedUser.setDateOfBirth(this.dateOfBirth);
        clonedUser.setReviewsGiven(new ArrayList<>(this.reviewsGiven));
        clonedUser.setReviewsReceived(new ArrayList<>(this.reviewsReceived));
        clonedUser.setAverageRating(this.averageRating);
        clonedUser.setRatingsCount(this.ratingsCount);
        clonedUser.setExperience(this.experience);
        clonedUser.setRating(this.rating);
        clonedUser.setNumOfRates(this.numOfRates);
        clonedUser.setRoles(new ArrayList<>(this.roles));
        clonedUser.setProfession(this.profession); // Assuming Profession is immutable
        clonedUser.setAccountStatus(this.accountStatus);
        clonedUser.setPhotoUrl(this.photoUrl);
        clonedUser.setUserProfessions(new ArrayList<>(this.userProfessions));
        clonedUser.setWorkAreas(this.workAreas);
        return clonedUser;

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