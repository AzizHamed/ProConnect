package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Profession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessionRepository extends JpaRepository<Profession, Long> {

    Profession findByName(String name);
}
