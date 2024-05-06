package com.braude.ProConnect.services;


import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.*;
import com.braude.ProConnect.models.enums.JobStatus;
import com.braude.ProConnect.models.page.JobPage;
import com.braude.ProConnect.models.searchCriteria.JobSearchCriteria;
import com.braude.ProConnect.repositories.*;
import com.braude.ProConnect.requests.CreateJobRequest;
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
//    private final PropertyService propertyService;
    private final ProfessionRepository professionRepository;
    private final CommentRepository commentRepository;
    private final AuthenticationService authenticationService;

    @Autowired
    public JobService(JobRepository jobRepository, JobRepositoryPaging jobRepositoryPaging, JobProposalRepository jobProposalRepository,
                      JobCriteriaRepository jobCriteriaRepository, UserService userService, ProfessionRepository professionRepository, CommentRepository commentRepository, AuthenticationService authenticationService) {
        this.jobRepository = jobRepository;
        this.jobProposalRepository = jobProposalRepository;
        this.jobRepositoryPaging = jobRepositoryPaging;
        this.jobCriteriaRepository = jobCriteriaRepository;

//        this.propertyService = propertyService;
        this.userService = userService;
        this.professionRepository = professionRepository;
        this.commentRepository = commentRepository;
        this.authenticationService = authenticationService;
    }

    public Job postJob(CreateJobRequest createJobRequest){
        User user = authenticationService.getAuthorizedUser();
        Job job = createJobRequest.getJob();
        Profession profession = professionRepository.findById(createJobRequest.getProfession().getId()).get();
//        Property property = propertyService.getProperty(createJobRequest.getPropertyId());
//        if(property == null)
//            throw new ProConnectException("Invalid property id");
        job.setOwner(user);
        job.setNeededProfessions(List.of(profession));
//        job.setProperty(property);

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

    public List<Job> getUserJobs() {
        User owner = authenticationService.getAuthorizedUser();
        return jobRepository.findAllByOwner(owner);
    }
    public List<Job> getUserJobs(String userId) {
        User owner = userService.getUser(userId);
        return jobRepository.findAllByOwner(owner);
    }

    public List<Job> getJobsByProfession(Long professionId) {
        Profession profession = professionRepository.findById(professionId).orElse(null);
        if(profession == null)
            throw new ProConnectException("Profession not found");
        return jobRepository.findAllByNeededProfessions(profession);
    }
    public List<Job> getJobsByProfession() {
        User user = authenticationService.getAuthorizedUser();
        if(user.getUserProfessions().isEmpty())
            throw new ProConnectException("User has no professions");
        UserProfession userProfession = user.getUserProfessions().get(0);
        Profession profession = professionRepository.findById(userProfession.getProfession().getId()).orElse(null);
        if(profession == null)
            throw new ProConnectException("Profession not found");
        return jobRepository.findAllByNeededProfessions(profession);
    }

    public List<Job> getJobsByProfessionAndWorkArea() {
        User user = authenticationService.getAuthorizedUser();
        if(user.getUserProfessions().isEmpty())
            throw new ProConnectException("User has no professions");
        UserProfession userProfession = user.getUserProfessions().get(0);
        Profession profession = professionRepository.findById(userProfession.getProfession().getId()).orElse(null);
        if(profession == null)
            throw new ProConnectException("Profession not found");
        return jobRepository.findAllByNeededProfessionsAndOwnerWorkAreas(profession, user.getWorkAreas());
    }
//     public List<Job> findJobByOwner(User owner) {
//         return jobRepository.findByOwner(owner);
//     }
}
