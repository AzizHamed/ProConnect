package com.braude.ProConnect.Filter;

import com.braude.ProConnect.models.entities.User;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class NameFilter implements Predicate {

    private String name;

    @Override
    public boolean filterForProfessional(User user) {
        return user.getName().getFirstName().contains(name) ? true
                : user.getName().getLastName().contains(name) ? true
                        : false;
    }
}
