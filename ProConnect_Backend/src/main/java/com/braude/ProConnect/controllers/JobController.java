package com.braude.ProConnect.controllers;


import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.Comment;
import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.models.page.JobPage;
import com.braude.ProConnect.models.searchCriteria.JobSearchCriteria;
import com.braude.ProConnect.services.JobService;
import jakarta.annotation.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("jobs")
@CrossOrigin
@Validated
public class JobController {


    private JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping("/post")
    public String postJobs(@RequestBody Job job){
        Job returnedJob = jobService.postJob(job);
        return "success";
    }


    @GetMapping("/page")
    public ResponseEntity<Page<Job>> getPages(JobPage jobPage, JobSearchCriteria jobSearchCriteria){
        return new ResponseEntity<>(jobService.getJobs(jobPage,jobSearchCriteria),
                HttpStatus.OK);
    }

    @PutMapping("/like")
    public String likePost(@RequestParam @Nonnull Long jobId, @RequestParam @Nonnull Long userId){
            return jobService.likePost(jobId,userId);
    }

    @PutMapping("/unlike")
    public String unLikePost(@RequestParam @Nonnull Long jobId, @RequestParam @Nonnull Long userId){
        return jobService.unLikePost(jobId,userId);
    }

    @PutMapping("/comment")
    public Comment commentOnPost(@RequestBody Comment comment){
        return jobService.addComment(comment);
    }
    /*@GetMapping("/user")
    public List<Job> getJobsByUser(@RequestParam Long userId){
        return jobService.getJobByUserId(userId);
    }*/

}
