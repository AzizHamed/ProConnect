package com.braude.ProConnect.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Objects;

/**
 * Services that professionals can offer in a profession.
 */
@Entity
@Table(name = "user_services")
public class UserService {
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

    public UserService() {
    }

    public UserService(String description, Service service, User user, double cost) {
        this.description = description;
        this.service = service;
        this.user = user;
        this.cost = cost;
    }

    public UserService(long id, String description, Service service, User user, double cost) {
        this.id = id;
        this.description = description;
        this.service = service;
        this.user = user;
        this.cost = cost;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserService that = (UserService) o;
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
