package com.braude.ProConnect.models.entities;
//worker apply to work with professional

import com.braude.ProConnect.models.embeddables.DayAndTime;
import com.braude.ProConnect.models.enums.JobProposalStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;
import java.util.Arrays;
import java.util.Date;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkerApply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long apply_id;


    @ManyToOne(optional = false)
    @JoinColumn(name = "worker_id", referencedColumnName = "user_id")
    private User worker;


    @ManyToOne(optional = false)
    @JoinColumn(name = "professional_id", referencedColumnName = "user_id")
    private User professional;

    private Date dayOfApply;

    private File cv;

    private String description;


    private JobProposalStatus jobProposalStatus = JobProposalStatus.UnderReview;

    public WorkerApply(User worker, User professional, Date dayOfApply, File cv, String description, DayAndTime[] availableWorkTime) {
        this.worker = worker;
        this.professional = professional;
        this.dayOfApply = dayOfApply;
        this.cv = cv;
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkerApply that = (WorkerApply) o;
        return Objects.equals(apply_id, that.apply_id) && Objects.equals(worker, that.worker) && Objects.equals(professional, that.professional) && Objects.equals(dayOfApply, that.dayOfApply) && Objects.equals(cv, that.cv) && Objects.equals(description, that.description) && jobProposalStatus == that.jobProposalStatus;
    }

    @Override
    public int hashCode() {
        return Objects.hash(apply_id, worker, professional, dayOfApply, cv, description, jobProposalStatus);
    }
}
