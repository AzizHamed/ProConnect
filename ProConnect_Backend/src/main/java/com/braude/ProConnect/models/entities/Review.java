package com.braude.ProConnect.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.ZonedDateTime;
import java.util.Objects;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private long id;

    @Min(value = 1)
    @Max(value = 5)
    @NotNull(message = "Review score must be provided.")
    private int score;

    @Size(min = 10, max = 2000)
    @Column(length = 2000)
    @NotNull(message = "Review text must be provided.")
    @NotEmpty(message = "Review text can't be empty.")
    private String reviewText;

    @ManyToOne
    @JoinColumn(name = "reviewer_user_id")
    @NotNull(message = "Reviewer can't be null.")
    @JsonIgnore
    private User reviewer;

    @ManyToOne
    @JoinColumn(name = "reviewed_user_id")
    @NotNull(message = "Reviewed user can't be null.")
    @JsonIgnore
    private User reviewedUser;

    @ManyToOne
    @JoinColumn(name = "role_id")
//    @NotNull(message = "Role of reviewed user can't be null.")
    private Role roleReviewed;

    private ZonedDateTime timestamp;



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Review review = (Review) o;
        return score == review.score && Objects.equals(reviewer, review.reviewer) && Objects.equals(reviewedUser, review.reviewedUser) && Objects.equals(roleReviewed, review.roleReviewed);
    }

    @Override
    public int hashCode() {
        return Objects.hash(score, reviewer, reviewedUser, roleReviewed);
    }
}
