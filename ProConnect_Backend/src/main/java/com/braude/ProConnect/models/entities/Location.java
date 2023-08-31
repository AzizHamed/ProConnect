package com.braude.ProConnect.models.entities;

import com.braude.ProConnect.models.embeddables.Geolocation;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "locations")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id", updatable = false)
    private long id;

    private String country;
    private String city;
    private String name;
    private String postalCode;
    @Embedded
    private Geolocation geolocation;

    public Location() {
    }

    public Location(long id, String country, String city, String name, String postalCode, Geolocation geolocation) {
        this.id = id;
        this.country = country;
        this.city = city;
        this.name = name;
        this.postalCode = postalCode;
        this.geolocation = geolocation;
    }

    public Location(long id, String country, String city, String name, String postalCode, double latitude, double longitude) {
        this.id = id;
        this.country = country;
        this.city = city;
        this.name = name;
        this.postalCode = postalCode;
        this.geolocation = new Geolocation(latitude, longitude);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String zipcode) {
        this.postalCode = zipcode;
    }

    public Geolocation getGeolocation() {
        return geolocation;
    }

    public void setGeolocation(Geolocation geolocation) {
        this.geolocation = geolocation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Location location = (Location) o;
        return id == location.id && country.equals(location.country) && city.equals(location.city) && Objects.equals(name, location.name) && postalCode.equals(location.postalCode) && Objects.equals(geolocation, location.geolocation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, country, city, name, postalCode, geolocation);
    }

    @Override
    public String toString() {
        return "Location: " + name + ", in " + city + ", " + country + ", " + postalCode;
    }
}
