package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}
