package com.braude.ProConnect.services;


import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.Comment;
import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.entities.Property;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.models.enums.JobStatus;
import com.braude.ProConnect.models.page.JobPage;
import com.braude.ProConnect.models.searchCriteria.JobSearchCriteria;
import com.braude.ProConnect.repositories.*;
import com.braude.ProConnect.security.SecurityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class JobService {

    private final JobRepositoryPaging jobRepositoryPaging;
    private final JobRepository jobRepository;
    private final JobProposalRepository jobProposalRepository;
    private final JobCriteriaRepository jobCriteriaRepository;
    private final UserService userService;
    private final PropertyService propertyService;
    private final CommentRepository commentRepository;


    @Autowired
    public JobService(JobRepository jobRepository, JobRepositoryPaging jobRepositoryPaging, JobProposalRepository jobProposalRepository,
                      JobCriteriaRepository jobCriteriaRepository, PropertyService propertyService, UserService userService, CommentRepository commentRepository) {
        this.jobRepository = jobRepository;
        this.jobProposalRepository = jobProposalRepository;
        this.jobRepositoryPaging = jobRepositoryPaging;
        this.jobCriteriaRepository = jobCriteriaRepository;

        this.propertyService = propertyService;
        this.userService = userService;
        this.commentRepository = commentRepository;
    }

    public Job postJob(Job job){
        User user = userService.getUser(job.getOwner().getId());
        Property property = propertyService.getProperty(job.getProperty().getId());
        if(user == null)
            throw new ProConnectException("Invalid user id");
        if(property == null)
            throw new ProConnectException("Invalid property id");
        job.setOwner(user);
        job.setProperty(property);

        job.setDatePosted(OffsetDateTime.now());
        job.setJobStatus(JobStatus.PUBLISHED);
        return jobRepository.save(job);
    }

    public Page<Job> getJobs(JobPage jobPage, JobSearchCriteria jobSearchCriteria){
        /*Sort sort = Sort.by(jobPage.getSortDirection(), jobPage.getSortBy());
        Pageable pageable = PageRequest.of(jobPage.getPageNumber(),jobPage.getPageSize(),sort);
        return jobRepositoryPaging.findAll(pageable);*/
        var auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getCredentials()); // Null
        System.out.println(auth.getPrincipal()); // SecurityUser
        System.out.println(auth.getName()); // Email
        var securityUser = (SecurityUser)auth.getPrincipal();
        System.out.println(securityUser.getUser().getId());
        return jobCriteriaRepository.findAllWithFilters(jobSearchCriteria, jobPage);

    }

    public String likePost(Long jobId, String userId)  {
        checkIfUserAndJobValid(userId,jobId);
        Job job = jobRepository.findById(jobId).get();
        User user = userService.getUser(userId);
        if(job.getLikedUsers().contains(user))
            throw new ProConnectException("user already likes the post");
        job.getLikedUsers().add(user);
        jobRepository.save(job);
        return "success";
    }

    public String unLikePost(Long jobId, String userId) {
        checkIfUserAndJobValid(userId,jobId);
        Job job = jobRepository.findById(jobId).get();
        User user = userService.getUser(userId);
        if(!job.getLikedUsers().contains(user))
            throw new ProConnectException("user does not like this post");
        job.getLikedUsers().remove(user);
        jobRepository.save(job);
        return "success";
    }

    private void checkIfUserAndJobValid(String userId, Long jobId) throws ProConnectException{
        if(!jobRepository.findById(jobId).isPresent() && userService.getUser(userId)==null)
            throw new ProConnectException("job and user not found");

        if(!jobRepository.findById(jobId).isPresent())
            throw new ProConnectException("job not found");

        if(userService.getUser(userId)==null)
            throw new ProConnectException("user not found");
    }

    public Comment addComment(Comment comment) {
        checkIfUserAndJobValid(comment.getUser().getId(),comment.getJobId());
        Job job = jobRepository.findById(comment.getJobId()).get();
        job.getCommentedUsers().add(comment);
        commentRepository.save(comment);
        return comment;
    }

    public Comment deleteComment(Long id) {
        Comment comment = commentRepository.findById(id).get();
        if(comment==null)
            throw new ProConnectException("comment with id: " + id +  " does not exist");
        checkIfUserAndJobValid(comment.getUser().getId(),comment.getJobId());
        Job job = jobRepository.findById(comment.getJobId()).get();
        job.getCommentedUsers().remove(comment);
        jobRepository.save(job);
        commentRepository.delete(comment);
        return comment;
    }

}
