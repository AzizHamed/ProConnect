package com.braude.ProConnect.models.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "property_id", updatable = false)
    private long id;

    @ManyToOne
    @MapsId("id")
    @JoinColumn(name = "user_id")
    private User owner;
    @OneToOne
    @MapsId("id")
    @JoinColumn(name = "location_id")
    private Location location;

    public Property() {
    }

    public Property(long id, User owner, Location location) {
        this.id = id;
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
}
