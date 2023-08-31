package com.braude.ProConnect.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.ZonedDateTime;
import java.util.Objects;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private long id;

    @Min(value = 1)
    @Max(value = 5)
    private int score;

    @Size(min = 10, max = 2000)
    @Column(length = 2000)
    private String reviewText;

    @ManyToOne
    @JoinColumn(name = "reviewer_user_id")
    private User reviewer;

    @ManyToOne
    @JoinColumn(name = "reviewed_user_id")
    private User reviewedUser;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role roleReviewed;

    @NotNull
    private ZonedDateTime timestamp;

    public Review() {
    }

    public Review(long id, int score, String reviewText, User reviewer, User reviewedUser, Role roleReviewed, ZonedDateTime timestamp) {
        this.id = id;
        this.score = score;
        this.reviewText = reviewText;
        this.reviewer = reviewer;
        this.reviewedUser = reviewedUser;
        this.roleReviewed = roleReviewed;
        this.timestamp = timestamp;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public User getReviewer() {
        return reviewer;
    }

    public void setReviewer(User reviewer) {
        this.reviewer = reviewer;
    }

    public User getReviewedUser() {
        return reviewedUser;
    }

    public void setReviewedUser(User reviewedUser) {
        this.reviewedUser = reviewedUser;
    }

    public Role getRoleReviewed() {
        return roleReviewed;
    }

    public void setRoleReviewed(Role roleReviewed) {
        this.roleReviewed = roleReviewed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Review review = (Review) o;
        return id == review.id && score == review.score && Objects.equals(reviewText, review.reviewText) && Objects.equals(reviewer, review.reviewer) && Objects.equals(reviewedUser, review.reviewedUser) && Objects.equals(roleReviewed, review.roleReviewed);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, score, reviewText, reviewer, reviewedUser, roleReviewed);
    }
}
