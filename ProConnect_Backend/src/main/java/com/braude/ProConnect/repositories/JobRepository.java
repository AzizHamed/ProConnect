package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobRepository extends JpaRepository<Job,Long> {

    List<Job> findByUserId(Long userId);
}
