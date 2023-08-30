package com.braude.ProConnect.entities;

import com.braude.ProConnect.embeddables.Availability;
import jdk.javadoc.doclet.Taglet;
import org.hibernate.grammars.hql.HqlParser;

import javax.xml.stream.Location;
import java.util.TimeZone;

public class Professional extends User {

    private int yeareOfExperience;
    private String job;

    private Availability availability;

    private String telephone;

    public int getYeareOfExperience() {
        return yeareOfExperience;
    }

    public void setYeareOfExperience(int yeareOfExperience) {
        this.yeareOfExperience = yeareOfExperience;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public Availability getAvailability() {
        return availability;
    }

    public void setAvailability(Availability availability) {
        this.availability = availability;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    @Override
    public String getEmail() {
        return super.getEmail();
    }

    @Override
    public void setEmail(String email) {
        super.setEmail(email);
    }
}
