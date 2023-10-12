package com.braude.ProConnect.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

/**
 * Services that professionals can offer in a profession.
 */
@Entity
@Table(name = "user_services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserServiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_service_id", updatable = false)
    private long id;

    @NotNull(message = "Service description can't be null.")
    @Column(unique = true, length = 256)
    @Size(max = 4096)
    private String description;

    @ManyToOne
    @NotNull(message = "Service can't be null.")
    @JoinColumn(name = "service_id")
    private Service service;
    @ManyToOne
    @NotNull(message = "User can't be null.")
    @JoinColumn(name = "user_id")
    private User user;

    private double cost;


    public UserServiceEntity(String description, Service service, User user, double cost) {
        this.description = description;
        this.service = service;
        this.user = user;
        this.cost = cost;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserServiceEntity that = (UserServiceEntity) o;
        return Double.compare(that.cost, cost) == 0 && description.equals(that.description) && service.equals(that.service) && user.equals(that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(description, service, user, cost);
    }

    @Override
    public String toString() {
        return "UserService: " + user.getName() + "_" + service;
    }
}
