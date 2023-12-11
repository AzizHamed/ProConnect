package com.braude.ProConnect.services;


import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.models.enums.JobStatus;
import com.braude.ProConnect.models.page.JobPage;
import com.braude.ProConnect.repositories.JobProposalRepository;
import com.braude.ProConnect.repositories.JobRepository;
import com.braude.ProConnect.repositories.JobRepositoryPaging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class JobService {

    private final JobRepositoryPaging jobRepositoryPaging;
    private final JobRepository jobRepository;

    private final JobProposalRepository jobProposalRepository;


    @Autowired
    public JobService(JobRepository jobRepository, JobRepositoryPaging jobRepositoryPaging, JobProposalRepository jobProposalRepository) {
        this.jobRepository = jobRepository;
        this.jobProposalRepository = jobProposalRepository;
        this.jobRepositoryPaging = jobRepositoryPaging;
    }

    public Job postJob(Job job){
        job.setDatePosted(OffsetDateTime.now());
        job.setJobStatus(JobStatus.PUBLISHED);
        return jobRepository.save(job);
    }

    public Page<Job> getJobs(JobPage jobPage){
        Sort sort = Sort.by(jobPage.getSortDirection(), jobPage.getSortBy());
        Pageable pageable = PageRequest.of(jobPage.getPageNumber(),jobPage.getPageSize(),sort);
        return jobRepositoryPaging.findAll(pageable);
    }


   /* public List<Job> getJobByUserId(Long userId) {
        return jobRepository.findByUserId(userId);
    }*/
}
