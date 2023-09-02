package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}
