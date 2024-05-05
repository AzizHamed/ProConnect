package com.braude.ProConnect.controllers;


import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.entities.JobOffer;
import com.braude.ProConnect.services.JobOfferService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("jobOffers")
@CrossOrigin
@Validated
@Tag(name = "JobOffers")
public class JobOfferController {


    @Autowired
    private JobOfferService jobOfferService;

    @PostMapping(value = "PostOffer")
    public void postJobOffer(@RequestBody JobOffer jobOffer){
        jobOfferService.save(jobOffer);
    }

    @GetMapping(value = "getBestOffer")
    public JobOffer getBestOffer(@RequestBody Job job){
        if(job==null){
            return null;
        }
        JobOffer jobOffer = jobOfferService.findBest(job);
        return jobOffer;
    }
}
