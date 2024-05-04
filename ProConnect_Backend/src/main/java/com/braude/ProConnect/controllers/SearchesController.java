package com.braude.ProConnect.controllers;


import com.braude.ProConnect.services.SearchesService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("searches")
@CrossOrigin()
@Validated
@Tag(name = "searches")
public class SearchesController {


    @Autowired
    private SearchesService searchesService;


    @GetMapping(value = "/search")
    public int getSearchesNumbers(){
        return searchesService.getSearches();
    }
}
