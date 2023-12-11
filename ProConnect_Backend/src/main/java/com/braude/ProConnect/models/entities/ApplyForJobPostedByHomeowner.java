package com.braude.ProConnect.models.entities;


// professional and contractor apply to homeowner from post

import com.braude.ProConnect.models.enums.JobProposalStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;
import java.util.Date;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplyForJobPostedByHomeowner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long apply_id;

    private Date date;


    @ManyToOne(optional = false)
    @JoinColumn(name = "post_id", referencedColumnName = "job_id")
    private Job jobPost;


    @ManyToOne(optional = false)
    @JoinColumn(name = "applier_id", referencedColumnName = "user_id")
    private User applier;

    private File cv;

    private String description;

    private JobProposalStatus jobProposalStatus = JobProposalStatus.UnderReview;

    public ApplyForJobPostedByHomeowner(Date date, Job jobPost, User applier, File cv, String description) {
        this.date = date;
        this.jobPost = jobPost;
        this.applier = applier;
        this.cv = cv;
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ApplyForJobPostedByHomeowner that = (ApplyForJobPostedByHomeowner) o;
        return Objects.equals(apply_id, that.apply_id) && Objects.equals(date, that.date) && Objects.equals(jobPost, that.jobPost) && Objects.equals(applier, that.applier) && Objects.equals(cv, that.cv) && Objects.equals(description, that.description) && jobProposalStatus == that.jobProposalStatus;
    }

    @Override
    public int hashCode() {
        return Objects.hash(apply_id, date, jobPost, applier, cv, description, jobProposalStatus);
    }
}
