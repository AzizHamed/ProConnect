package com.braude.ProConnect.controllers;


import com.braude.ProConnect.models.entities.Article;
import com.braude.ProConnect.services.ArticleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("articles")
@CrossOrigin
@Validated
@Tag(name = "articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping(value = "getAllArticles")
    public List<Article> getAllArticles(){
        return articleService.findAll();
    }
}
