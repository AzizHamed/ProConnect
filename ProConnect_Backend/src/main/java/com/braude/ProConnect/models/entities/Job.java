package com.braude.ProConnect.models.entities;

import com.braude.ProConnect.models.enums.JobStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.OffsetDateTime;
import java.util.Objects;

@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id", updatable = false)
    private long id;
    private double budget;
    @ManyToOne
    private User owner;
    @ManyToOne
    private Property property;
    private OffsetDateTime datePosted;
    @Enumerated(EnumType.STRING)
    private JobStatus jobStatus;
    @Size(max = 512, message = "Job title must be under 512 characters long.")
    @NotNull(message = "Job title can't be null.")
    @NotEmpty(message = "Job title can't be empty.")
    private String title;

    @Size(max = 25000, message = "Job description must be under 25,000 characters long.")
    @NotNull(message = "Job description can't be null.")
    @NotEmpty(message = "Job description can't be empty.")
    private String description;

    public Job() {
    }

    public Job(long id, double budget, User owner, Property property, OffsetDateTime datePosted, JobStatus jobStatus, String title, String description) {
        this.id = id;
        this.budget = budget;
        this.owner = owner;
        this.property = property;
        this.datePosted = datePosted;
        this.jobStatus = jobStatus;
        this.title = title;
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getBudget() {
        return budget;
    }

    public void setBudget(double budget) {
        this.budget = budget;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }

    public OffsetDateTime getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(OffsetDateTime datePosted) {
        this.datePosted = datePosted;
    }

    public JobStatus getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(JobStatus jobStatus) {
        this.jobStatus = jobStatus;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Job job = (Job) o;
        return id == job.id && Double.compare(job.budget, budget) == 0 && owner.equals(job.owner) && property.equals(job.property) && datePosted.equals(job.datePosted) && jobStatus == job.jobStatus && title.equals(job.title) && description.equals(job.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, budget, owner, property, datePosted, jobStatus, title, description);
    }
}
