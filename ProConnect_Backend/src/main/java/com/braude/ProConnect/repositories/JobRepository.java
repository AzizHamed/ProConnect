package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {

}
