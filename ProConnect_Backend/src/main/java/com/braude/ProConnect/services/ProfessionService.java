package com.braude.ProConnect.services;

import com.braude.ProConnect.models.entities.Profession;
import com.braude.ProConnect.repositories.ProfessionRepository;
import com.braude.ProConnect.repositories.UserProfessionsRepository;
import com.braude.ProConnect.requests.PopularProfessions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ProfessionService {
    private final ProfessionRepository professionRepository;
    private final UserProfessionsRepository userProfessionsRepository;

    @Autowired
    public ProfessionService(ProfessionRepository professionRepository, UserProfessionsRepository userProfessionsRepository) {
        this.professionRepository = professionRepository;
        this.userProfessionsRepository = userProfessionsRepository;
    }


    public Profession addProfessions(String name, String description, String iconUrl) {
        Profession profession = new Profession(name, description, iconUrl);
        return professionRepository.save(profession);
    }

    public List<Profession> addProfessions(List<Profession> professions) {
        List<Profession> addedProfessions = new ArrayList<>();
        for (Profession profession : professions) {
            addedProfessions.add(professionRepository.save(profession));
        }
        return addedProfessions;
    }

    public Profession getProfessionByName(String name){
        return professionRepository.findByName(name);
    }

    public List<Profession> getProfessions() {
        return professionRepository.findAll();
    }

    public Profession getProfessionById(long id) { return professionRepository.findById(id).orElse(null); }
    public List<Profession> findAll() {
        return professionRepository.findAll();
    }

    public List<PopularProfessions> getPopularProfessions() {
        List<Profession> professions = getProfessions();
        List<PopularProfessions> popularProfessions = new ArrayList<>();
        for (Profession profession : professions) {
            var count = userProfessionsRepository.countUserProfessionByProfession(profession);
            popularProfessions.add(new PopularProfessions(profession, count));
        }
        Collections.sort(popularProfessions, Collections.reverseOrder());
        return popularProfessions;
    }
}
