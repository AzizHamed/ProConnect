package com.braude.ProConnect.models.entities;
//worker apply to job posted by professional

import com.braude.ProConnect.models.embeddables.DayAndTime;
import com.braude.ProConnect.models.enums.JobProposalStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Objects;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WorkerApplyToJobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long apply_id;


    @ManyToOne(optional = false)
    @JoinColumn(name = "post_id", referencedColumnName = "post_id")
    private JobPostByProfessional jobPostByProfessional;

    @ManyToOne(optional = false)
    @JoinColumn(name = "worker_id", referencedColumnName = "user_id")
    private User sender;


    private Date dayAndTime;

    @Enumerated(EnumType.STRING)
    private JobProposalStatus jobProposalStatus = JobProposalStatus.UnderReview;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkerApplyToJobPost that = (WorkerApplyToJobPost) o;
        return Objects.equals(apply_id, that.apply_id) && Objects.equals(jobPostByProfessional, that.jobPostByProfessional) && Objects.equals(sender, that.sender) && Objects.equals(dayAndTime, that.dayAndTime) && jobProposalStatus == that.jobProposalStatus;
    }

    @Override
    public int hashCode() {
        return Objects.hash(apply_id, jobPostByProfessional, sender, dayAndTime, jobProposalStatus);
    }
}
