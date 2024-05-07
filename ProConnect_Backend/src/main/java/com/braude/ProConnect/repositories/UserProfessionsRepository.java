package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Profession;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.models.entities.UserProfession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProfessionsRepository extends JpaRepository<UserProfession, Long> {
    List<UserProfession> findAllByUser(User user);
    List<UserProfession> findAllByProfession(Profession profession);

    Long countUserProfessionByProfession(Profession profession);
}
