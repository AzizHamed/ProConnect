package com.braude.ProConnect.jobMatchingAlgorithm;

import com.braude.ProConnect.models.entities.JobOffer;
import com.braude.ProConnect.models.entities.User;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public class JobMatchingAlgorithm {

    private final double ratingWeight = 0.4;
    private final double experienceWeight = 0.3;
//    private final double distanceWeight = 0.2;
    private final double priceWeight = 0.2;



     public JobOffer chooseOffer(@RequestParam List<JobOffer> jobOffers){

         double bestScore = 0;
         JobOffer bestOffer=null;
         double score;


         for(int i=0 ; i< jobOffers.size() ; i++){
             score = calculateScore(jobOffers.get(i).getSenderUser(),jobOffers.get(i).getBid());
             if(score > bestScore){
                 bestScore = score;
                 bestOffer = jobOffers.get(i);
             }
         }


         return bestOffer;

     }

     private double calculateScore(User user, double price){
         double score = user.getRating() * ratingWeight + user.getExperience() * experienceWeight +
                 (1 / price) * priceWeight;

         return score;
     }
}
