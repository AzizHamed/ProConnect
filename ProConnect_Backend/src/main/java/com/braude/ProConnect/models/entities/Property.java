package com.braude.ProConnect.models.entities;

import com.braude.ProConnect.models.embeddables.Location;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.Objects;

@Entity
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "property_id", updatable = false)
    private long id;

    @NotNull(message = "Property name can't be null.")
    @NotEmpty(message = "Property name can't be empty.")
    private String name;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    private User owner;
    @Embedded
    private Location location;

    public Property() {
    }

    public Property(long id, String name, User owner, Location location) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.location = location;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Property property = (Property) o;
        return name.equals(property.name) && owner.equals(property.owner) && location.equals(property.location);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, owner, location);
    }

    @Override
    public String toString() {
        return name + ", owned by " + owner.getName();
    }
}
