package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Profession;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.models.entities.UserProfession;
import com.braude.ProConnect.models.enums.WorkAreas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    List<User> findByWorkAreas(WorkAreas workAreas);

    List<User> findByProfession(Profession profession);

    List<User> findByProfessionAndWorkAreas(Profession profession, WorkAreas workAreas);
    List<User> findByUserProfessionsAndWorkAreas(UserProfession profession, WorkAreas workAreas);

    User findByEmail(String email);


//    User findByEmail(String email);
//
//
//    List<User> findAllByEmailList(List<String> emails);

//    User findByEmail(String email);
//
//
//    List<User> findAllByEmailList(List<String> emails);
}
