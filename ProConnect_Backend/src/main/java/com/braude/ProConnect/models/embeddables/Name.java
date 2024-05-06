package com.braude.ProConnect.models.embeddables;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Size;

import java.util.Objects;

@Embeddable
public class Name {
    @Size(min = 2, max = 16)
    private String firstName;
    @Size(min = 2, max = 16)

    private String lastName;
    public Name(String firstName, String lastName) {
        this.firstName = firstName.substring(0, 1).toUpperCase() + firstName.substring(1).toLowerCase();
        this.lastName = lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase();
    }

    public Name() {
        firstName = "";
        lastName = "";
    }
    public void toUpperCase() {
        firstName = firstName.substring(0, 1).toUpperCase() + firstName.substring(1).toLowerCase();
        lastName = lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase();
    }
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Name name = (Name) o;
        return Objects.equals(firstName, name.firstName) && Objects.equals(lastName, name.lastName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(firstName, lastName);
    }

//    @Override
//    public String toString() {
//        return firstName + " " + lastName;
//    }
}
