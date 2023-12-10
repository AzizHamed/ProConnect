package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job,Long> {

    List<Job> findByOwner(User user);
}
