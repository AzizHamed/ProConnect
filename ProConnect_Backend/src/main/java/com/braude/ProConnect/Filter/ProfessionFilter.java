package com.braude.ProConnect.Filter;

import com.braude.ProConnect.models.entities.Profession;
import com.braude.ProConnect.models.entities.User;

import java.util.ArrayList;
import java.util.List;

public class ProfessionFilter implements Predicate{

    private Profession profession;

    public ProfessionFilter(Profession profession) {
        this.profession = profession;
    }

    @Override
    public boolean filterForProfessional(User user) {
       // if(user.getProfessions().contains(profession))
            return true;
    }
}
