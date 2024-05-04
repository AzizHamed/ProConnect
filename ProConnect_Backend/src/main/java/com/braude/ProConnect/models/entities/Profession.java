package com.braude.ProConnect.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

/**
 * Professions that users can have, like Construction, Carpentry, Welding...
 */
@Entity
@Table(name = "professions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

    @NotNull
    private String svg;



//    @NotNull
//    @ManyToOne
//    @JoinColumn(name = "category", referencedColumnName = "id")
//    private Category category;



    public Profession(String name, String description, String svg) {
        this.name = name;
        this.description = description;
        this.svg = svg;
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
