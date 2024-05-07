package com.braude.ProConnect.services;


import com.braude.ProConnect.jobMatchingAlgorithm.JobMatchingAlgorithm;
import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.entities.JobOffer;
import com.braude.ProConnect.repositories.JobOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobOfferService {

    private JobMatchingAlgorithm jobMatchingAlgorithm = new JobMatchingAlgorithm();
    @Autowired
    private JobOfferRepository jobOfferRepository;

    @Autowired
    private JobService jobService;

    @Autowired
    private UserService userService;
    public void save(JobOffer jobOffer) {
        jobOfferRepository.save(jobOffer);
    }

    public JobOffer findBest(Job job) {

        List<JobOffer> jobOffers = jobOfferRepository.findByJob(job);
        System.out.println(jobOffers.size());
        return  jobMatchingAlgorithm.chooseOffer(jobOffers);

    }

    public List<JobOffer> findByJob(Long id) {
        Job job = jobService.findById(id);
        return jobOfferRepository.findByJob(job);
    }
}
