package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Review;
import com.braude.ProConnect.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByReviewer(User reviewer);
    List<Review> findByReviewerOrderByScore(User reviewer);
    List<Review> findByReviewerOrderByTimestampAsc(User reviewer);

    List<Review> findByReviewedUser(User reviewedUser);
    List<Review> findByReviewedUserOrderByScore(User reviewedUser);
    List<Review> findByReviewedUserOrderByTimestampAsc(User reviewedUser);
}
