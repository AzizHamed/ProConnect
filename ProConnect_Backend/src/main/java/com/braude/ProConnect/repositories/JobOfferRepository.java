package com.braude.ProConnect.repositories;


import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.entities.JobOffer;
import com.braude.ProConnect.models.entities.JobPostByProfessional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobOfferRepository extends JpaRepository<JobOffer,Long> {
    List<JobOffer> findByJob(Job job);
}
