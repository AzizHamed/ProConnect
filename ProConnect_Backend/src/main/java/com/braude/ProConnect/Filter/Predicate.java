package com.braude.ProConnect.Filter;

import com.braude.ProConnect.models.entities.User;

public interface Predicate {

    public boolean filterForProfessional(User user);
}
