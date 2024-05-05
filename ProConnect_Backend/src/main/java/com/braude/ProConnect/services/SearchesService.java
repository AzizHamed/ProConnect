package com.braude.ProConnect.services;


import com.braude.ProConnect.models.entities.Searches;
import com.braude.ProConnect.repositories.SearchesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchesService {

    @Autowired
    private SearchesRepository searchesRepository;
    public int getSearches() {
        Searches searches = searchesRepository.findAll().get(0);
        return searches.getSearches();
    }

    public void init (){
        Searches searches = searchesRepository.findAll().get(0);
        if(searches == null){
            searchesRepository.save(Searches.builder().searches(0).id(0L).build());
    }
    }
}
