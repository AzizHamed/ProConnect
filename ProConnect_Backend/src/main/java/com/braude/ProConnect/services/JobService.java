package com.braude.ProConnect.services;


import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.enums.JobStatus;
import com.braude.ProConnect.repositories.JobProposalRepository;
import com.braude.ProConnect.repositories.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    private final JobProposalRepository jobProposalRepository;


    @Autowired
    public JobService(JobRepository jobRepository, JobProposalRepository jobProposalRepository) {
        this.jobRepository = jobRepository;
        this.jobProposalRepository = jobProposalRepository;
    }

    public Job postJob(Job job){
        job.setDatePosted(OffsetDateTime.now());
        job.setJobStatus(JobStatus.PUBLISHED);
        return jobRepository.save(job);
    }

    public List<Job> getJobByUserId(Long userId) {
        return jobRepository.findByUserId(userId);
    }
}
