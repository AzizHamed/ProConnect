package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByOwner_Id(String userId);
}
