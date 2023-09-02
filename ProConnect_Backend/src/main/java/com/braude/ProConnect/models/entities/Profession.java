package com.braude.ProConnect.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Objects;

/**
 * Professions that users can have, like Construction, Carpentry, Welding...
 */
@Entity
@Table(name = "professions")
public class Profession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profession_id", updatable = false)
    private long id;

    @NotNull(message = "Profession name can't be null.")
    @NotEmpty(message = "Profession name can't be empty.")
    @Column(unique = true, length = 256)
    @Size(min = 1, max = 256)
    private String name;

    @NotNull(message = "Profession description can't be null.")
    @Column(length = 8192)
    @Size(max = 8192)
    private String description;

    public Profession() {
    }

    public Profession(long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Profession(String name, String description) {
        this.name = name;
        this.description = description;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Profession that = (Profession) o;
        return name.equals(that.name) && description.equals(that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, description);
    }

    @Override
    public String toString() {
        return name;
    }
}
