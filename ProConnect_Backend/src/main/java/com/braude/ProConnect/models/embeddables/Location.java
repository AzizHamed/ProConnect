package com.braude.ProConnect.models.embeddables;

import jakarta.persistence.*;
import org.springframework.data.geo.Point;

import java.util.Objects;

@Embeddable
public class Location {
    private String country;
    private String city;
    private String address;
    private String postalCode;
    private Point point;
    public Location() {
    }

    public Location(String country, String city, String address, String postalCode, Point location) {
        this.country = country;
        this.city = city;
        this.address = address;
        this.postalCode = postalCode;
        this.point = location;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String name) {
        this.address = name;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String zipcode) {
        this.postalCode = zipcode;
    }

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point location) {
        this.point = location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Location location = (Location) o;
        return country.equals(location.country) && city.equals(location.city) && Objects.equals(address, location.address) && postalCode.equals(location.postalCode) && Objects.equals(location, location.point);
    }

    @Override
    public int hashCode() {
        return Objects.hash(country, city, address, postalCode, point);
    }

    @Override
    public String toString() {
        return "Location: " + address + ", in " + city + ", " + country + ", " + postalCode;
    }
}
