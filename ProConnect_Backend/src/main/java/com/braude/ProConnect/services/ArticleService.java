package com.braude.ProConnect.services;


import com.braude.ProConnect.models.entities.Article;
import com.braude.ProConnect.repositories.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {
    @Autowired
    private ArticleRepository articleRepository;
    public List<Article> findAll() {
        return articleRepository.findAll();
    }
}
