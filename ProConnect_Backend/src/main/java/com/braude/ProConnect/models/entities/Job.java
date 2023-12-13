package com.braude.ProConnect.models.entities;

import com.braude.ProConnect.models.enums.JobStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id", updatable = false)
    private long id;
    private double budget;
    @ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User owner;
    @JoinColumn(name = "property_id", referencedColumnName = "property_id")
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private Property property;


    private OffsetDateTime datePosted;

    //private OffsetDateTime datePosted;
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


    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "User_Job",
    joinColumns = @JoinColumn(name = "job_id"),
    inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> likedUsers ;

    @OneToMany(mappedBy = "job")
    private List<Comment> commentedUsers;

    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name = "job_profession",
    joinColumns = @JoinColumn(name = "job_id", referencedColumnName = "job_id"),
    inverseJoinColumns = @JoinColumn(name = "profession_id", referencedColumnName = "profession_id"))
    private List<Profession> neededProfessions;

    private int numberOfReports=0;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Job job = (Job) o;
        return id == job.id && Double.compare(job.budget, budget) == 0 && numberOfReports == job.numberOfReports && Objects.equals(owner, job.owner) && Objects.equals(property, job.property) && jobStatus == job.jobStatus && Objects.equals(title, job.title) && Objects.equals(description, job.description) && Objects.equals(likedUsers, job.likedUsers) && Objects.equals(commentedUsers, job.commentedUsers) && Objects.equals(neededProfessions, job.neededProfessions);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, budget, owner, property, jobStatus, title, description, likedUsers, commentedUsers, neededProfessions, numberOfReports);
    }
}