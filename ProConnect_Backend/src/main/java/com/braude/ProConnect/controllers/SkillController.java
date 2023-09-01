package com.braude.ProConnect.controllers;

import com.braude.ProConnect.models.entities.Skill;
import com.braude.ProConnect.services.SkillService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("skills")
@CrossOrigin()
@Validated
public class SkillController {
    private final SkillService skillService;

    @Autowired
    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Skill> createSkill(@Valid @RequestBody Skill skill) {
        Skill newSkill = skillService.addSkill(skill);
        return new ResponseEntity<>(newSkill, HttpStatus.OK);

    }
}
