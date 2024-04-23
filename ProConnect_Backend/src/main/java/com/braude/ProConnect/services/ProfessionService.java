package com.braude.ProConnect.services;

import com.braude.ProConnect.models.entities.Profession;
import com.braude.ProConnect.repositories.ProfessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessionService {
    private final ProfessionRepository professionRepository;

    @Autowired
    public ProfessionService(ProfessionRepository professionRepository) {
        this.professionRepository = professionRepository;
    }


    public Profession addProfessions(String name, String description, String iconUrl) {
        Profession profession = new Profession(name, description, iconUrl);
        return professionRepository.save(profession);
    }

    public Profession getProfessionByName(String name){
        return professionRepository.findByName(name);
    }

    public List<Profession> getProfessions() {
        return professionRepository.findAll();
    }
}
