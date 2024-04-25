package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {


    User findByEmail(String email);


    List<User> findAllByEmailList(List<String> emails);

}
