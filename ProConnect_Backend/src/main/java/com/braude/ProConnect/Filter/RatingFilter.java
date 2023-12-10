package com.braude.ProConnect.Filter;

import com.braude.ProConnect.models.entities.User;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class RatingFilter implements Predicate{

    private int rating;
    @Override
    public boolean filterForProfessional(User user) {
        return true;
    }
}
