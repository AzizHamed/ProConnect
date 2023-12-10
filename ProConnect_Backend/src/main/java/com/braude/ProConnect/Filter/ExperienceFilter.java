package com.braude.ProConnect.Filter;

import com.braude.ProConnect.models.entities.User;

public class ExperienceFilter implements Predicate{

    private int yearsOfExperience;

    public ExperienceFilter(int yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    @Override
    public boolean filterForProfessional(User user) {
        return true;
    }
}
