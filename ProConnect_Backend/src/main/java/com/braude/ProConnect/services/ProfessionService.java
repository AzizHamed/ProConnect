package com.braude.ProConnect.services;

import com.braude.ProConnect.models.entities.Profession;
import com.braude.ProConnect.repositories.ProfessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfessionService {
    private final ProfessionRepository professionRepository;

    @Autowired
    public ProfessionService(ProfessionRepository professionRepository) {
        this.professionRepository = professionRepository;
    }


    public Profession addProfessions(String name, String description) {
        Profession profession = new Profession(name, description);
        return professionRepository.save(profession);
    }
}
