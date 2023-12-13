package com.braude.ProConnect.services;


import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.Comment;
import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.models.enums.JobStatus;
import com.braude.ProConnect.models.page.JobPage;
import com.braude.ProConnect.models.searchCriteria.JobSearchCriteria;
import com.braude.ProConnect.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
public class JobService {

    private final JobRepositoryPaging jobRepositoryPaging;
    private final JobRepository jobRepository;

    private final JobProposalRepository jobProposalRepository;

    private final JobCriteriaRepository jobCriteriaRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CommentRepository commentRepository;


    @Autowired
    public JobService(JobRepository jobRepository, JobRepositoryPaging jobRepositoryPaging, JobProposalRepository jobProposalRepository,
                      JobCriteriaRepository jobCriteriaRepository) {
        this.jobRepository = jobRepository;
        this.jobProposalRepository = jobProposalRepository;
        this.jobRepositoryPaging = jobRepositoryPaging;
        this.jobCriteriaRepository = jobCriteriaRepository;

    }

    public Job postJob(Job job){
        job.setDatePosted(OffsetDateTime.now());
        job.setJobStatus(JobStatus.PUBLISHED);
        return jobRepository.save(job);
    }

    public Page<Job> getJobs(JobPage jobPage, JobSearchCriteria jobSearchCriteria){
        /*Sort sort = Sort.by(jobPage.getSortDirection(), jobPage.getSortBy());
        Pageable pageable = PageRequest.of(jobPage.getPageNumber(),jobPage.getPageSize(),sort);
        return jobRepositoryPaging.findAll(pageable);*/

        return jobCriteriaRepository.findAllWithFilters(jobSearchCriteria, jobPage);

    }

    public String likePost(Long jobId, Long userId)  {
        checkIfUserAndJobValid(userId,jobId);
        Job job = jobRepository.findById(jobId).get();
        User user = userService.getUser(userId);
        if(job.getLikedUsers().contains(user))
            throw new ProConnectException("user already likes the post");
        job.getLikedUsers().add(user);
        jobRepository.save(job);
        return "success";
    }

    public String unLikePost(Long jobId, Long userId) {
        checkIfUserAndJobValid(userId,jobId);
        Job job = jobRepository.findById(jobId).get();
        User user = userService.getUser(userId);
        if(!job.getLikedUsers().contains(user))
            throw new ProConnectException("user does not like this post");
        job.getLikedUsers().remove(user);
        jobRepository.save(job);
        return "success";
    }

    private void checkIfUserAndJobValid(Long userId, Long jobId) throws ProConnectException{
        if(!jobRepository.findById(jobId).isPresent() && userService.getUser(userId)==null)
            throw new ProConnectException("job and user not found");

        if(!jobRepository.findById(jobId).isPresent())
            throw new ProConnectException("job not found");

        if(userService.getUser(userId)==null)
            throw new ProConnectException("user not found");
    }

    public Comment addComment(Comment comment) {
        checkIfUserAndJobValid(comment.getUser().getId(),comment.getJob().getId());
        commentRepository.save(comment);
        return comment;
    }


   /* public List<Job> getJobByUserId(Long userId) {
        return jobRepository.findByUserId(userId);
    }*/
}
