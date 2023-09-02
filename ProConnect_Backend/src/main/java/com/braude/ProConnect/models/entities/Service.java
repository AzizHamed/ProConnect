package com.braude.ProConnect.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Objects;

/**
 * Services that professionals can offer in a profession.
 */
@Entity
@Table(name = "services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id", updatable = false)
    private long id;

    @NotNull(message = "Service name can't be null.")
    @NotEmpty(message = "Service name can't be empty.")
    @Column(unique = true, length = 256)
    @Size(min = 1, max = 256)
    private String name;

    @ManyToOne
    @JoinColumn(name = "profession_id")
    private Profession profession;

    public Service() {
    }

    public Service(String name, Profession profession) {
        this.name = name;
        this.profession = profession;
    }

    public Service(long id, String name, Profession profession) {
        this.id = id;
        this.name = name;
        this.profession = profession;
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

    public Profession getProfession() {
        return profession;
    }

    public void setProfession(Profession profession) {
        this.profession = profession;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Service service = (Service) o;
        return name.equals(service.name) && profession.equals(service.profession);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, profession);
    }

    @Override
    public String toString() {
        return name + "_" + profession;
    }
}
