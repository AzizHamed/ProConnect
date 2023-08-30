package com.braude.ProConnect.models.entities;

import java.util.List;

public class Worker extends User {

    private List<Professional> professionals;

    private String telephone;

    private int yeareOfExperience;

    public Worker(String name, String email, List<Professional> professionals, String telephone, int yeareOfExperience) {
        //super(name, email);
        this.professionals = professionals;
        this.telephone = telephone;
        this.yeareOfExperience = yeareOfExperience;
    }

    public Worker() {
    }

    public List<Professional> getProfessionals() {
        return professionals;
    }

    public void setProfessionals(List<Professional> professionals) {
        this.professionals = professionals;
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

    public int getYeareOfExperience() {
        return yeareOfExperience;
    }

    public void setYeareOfExperience(int yeareOfExperience) {
        this.yeareOfExperience = yeareOfExperience;
    }
}
