package com.braude.ProConnect.repositories;


import com.braude.ProConnect.models.entities.Searches;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchesRepository extends JpaRepository<Searches,Long> {
}
