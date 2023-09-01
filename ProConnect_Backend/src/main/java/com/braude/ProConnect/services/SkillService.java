package com.braude.ProConnect.services;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.embeddables.Location;
import com.braude.ProConnect.models.entities.Property;
import com.braude.ProConnect.models.entities.Skill;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.repositories.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SkillService {
    private final SkillRepository skillRepository;

    @Autowired
    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }


    public Skill addSkill(Skill skill) {
        return skillRepository.save(skill);
    }
}
