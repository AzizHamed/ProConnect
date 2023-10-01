package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.UserServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserServiceRepository extends JpaRepository<UserServiceEntity, Long> {
}
