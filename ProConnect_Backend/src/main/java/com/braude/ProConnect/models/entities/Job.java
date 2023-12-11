package com.braude.ProConnect.models.entities;

import com.braude.ProConnect.models.enums.JobStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id", updatable = false)
    private long id;
    private double budget;
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User owner;
    @JoinColumn(name = "property_id", referencedColumnName = "property_id")
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
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



    @OneToMany(fetch = FetchType.LAZY)
    private List<User> likedUsers;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Comment> commentedUsers;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Profession> neededProfessions;

    private int numberOfReports;



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Job job = (Job) o;
        return Double.compare(job.budget, budget) == 0 && owner.equals(job.owner) && property.equals(job.property) && datePosted.equals(job.datePosted) && jobStatus == job.jobStatus && title.equals(job.title) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(budget, owner, property, datePosted, jobStatus, title);
    }
}
