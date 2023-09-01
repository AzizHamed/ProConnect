package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
