package com.braude.ProConnect.services;

import com.braude.ProConnect.models.entities.Review;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserService userService;
    @Autowired
    public ReviewService(ReviewRepository reviewRepository, UserService userService) {
        this.reviewRepository = reviewRepository;
        this.userService = userService;
    }

    public Review createReview(Review review)
    {
        review.setId(0);
        review.setTimestamp(ZonedDateTime.now());
        return reviewRepository.save(review);
    }

    public List<Review> createReviews(List<Review> reviews)
    {
        List<Review> newReviews = new ArrayList<>();
        for (Review review : reviews) {
            review.setId(0);
            review.setTimestamp(ZonedDateTime.now());
            reviewRepository.save(review);
            newReviews.add(review);
        }
        return newReviews;
    }

    public List<Review> getReviewsByReviewerUserId(long reviewerUserId){
        User user = userService.getUser(reviewerUserId);
        return null;
    }
}
