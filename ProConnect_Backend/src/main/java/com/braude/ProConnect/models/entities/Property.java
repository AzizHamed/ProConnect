package com.braude.ProConnect.models.entities;

import com.braude.ProConnect.models.embeddables.Location;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity
@Table(name = "properties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
