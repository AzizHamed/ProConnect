package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.UserService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserServiceRepository extends JpaRepository<UserService, Long> {
}
