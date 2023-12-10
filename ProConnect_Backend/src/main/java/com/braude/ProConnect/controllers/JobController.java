package com.braude.ProConnect.controllers;


import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping()
    public String postJobs(@RequestBody Job job){
        Job returnedJob = jobService.postJob(job);
        return "success";
    }

    @GetMapping("/user")
    public List<Job> getJobsByUser(@RequestParam Long userId){
        return jobService.getJobByUserId(userId);
    }

}
