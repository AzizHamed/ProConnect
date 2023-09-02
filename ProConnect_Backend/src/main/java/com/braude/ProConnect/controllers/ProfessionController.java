package com.braude.ProConnect.controllers;

import com.braude.ProConnect.models.entities.Profession;
import com.braude.ProConnect.services.ProfessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("professions")
@CrossOrigin()
@Validated
public class ProfessionController {
    private final ProfessionService professionService;

    @Autowired
    public ProfessionController(ProfessionService professionService) {
        this.professionService = professionService;
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Profession> createService(String name, String description) {
        Profession profession = professionService.addProfessions(name, description);
        return new ResponseEntity<>(profession, HttpStatus.OK);

    }
}
