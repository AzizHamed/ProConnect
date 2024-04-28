package com.braude.ProConnect.controllers;


import com.braude.ProConnect.models.entities.Comment;
import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.models.page.JobPage;
import com.braude.ProConnect.models.searchCriteria.JobSearchCriteria;
import com.braude.ProConnect.requests.CreateJobRequest;
import com.braude.ProConnect.services.JobService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("jobs")
@CrossOrigin
@Validated
@Tag(name = "Jobs")
public class JobController {


    private JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping("/post")
    public ResponseEntity<Job> postJobs(@RequestBody CreateJobRequest createJobRequest){

        Job returnedJob = jobService.postJob(createJobRequest);
        return new ResponseEntity<>(returnedJob, HttpStatus.CREATED);
    }


    @GetMapping("/get-job-page")
    public ResponseEntity<Page<Job>> getJobs(JobPage jobPage, JobSearchCriteria jobSearchCriteria){
        return new ResponseEntity<>(jobService.getJobs(jobPage,jobSearchCriteria),
                HttpStatus.OK);
    }


    @GetMapping("/getJobByUser")
    public ResponseEntity<List<Job>> findJobByOwner(@RequestBody User owner){
        System.out.println("Owner " + owner);
        List<Job> jobs = jobService.findJobByOwner(owner);
        if(jobs.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(jobs,HttpStatus.OK);
    }

    @PutMapping("/like")
    public String likePost(@RequestParam @Nonnull Long jobId, @RequestParam @Nonnull String userId){
            return jobService.likePost(jobId,userId);
    }

    @PutMapping("/unlike")
    public String unlikePost(@RequestParam @Nonnull Long jobId, @RequestParam @Nonnull String userId){
        return jobService.unLikePost(jobId,userId);
    }

    @PutMapping("/comment")
    public Comment commentOnPost(@RequestBody Comment comment){
        return jobService.addComment(comment);
    }
    /*@GetMapping("/user")
    public List<Job> getJobsByUser(@RequestParam String userId){
        return jobService.getJobByUserId(userId);
    }*/

}
