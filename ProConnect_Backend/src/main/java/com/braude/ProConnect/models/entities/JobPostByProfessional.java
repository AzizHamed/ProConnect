package com.braude.ProConnect.models.entities;


import com.braude.ProConnect.models.embeddables.Location;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Objects;
//professional posts a job to workers and workers can apply to this job post

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPostByProfessional {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long post_id;

    private String title;

    private String description;

    private int numberOfWorkersNeeded;


    @ManyToOne(optional = false)
    @JoinColumn(name = "professional_id", referencedColumnName = "user_id")
    private User owner;



    private double income;


    public JobPostByProfessional(String title, String description, int numberOfWorkersNeeded, User owner, double income) {
        this.title = title;
        this.description = description;
        this.numberOfWorkersNeeded = numberOfWorkersNeeded;
        this.owner = owner;
        this.income = income;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JobPostByProfessional that = (JobPostByProfessional) o;
        return numberOfWorkersNeeded == that.numberOfWorkersNeeded && Double.compare(that.income, income) == 0 && Objects.equals(post_id, that.post_id) && Objects.equals(title, that.title) && Objects.equals(description, that.description) && Objects.equals(owner, that.owner) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(post_id, title, description, numberOfWorkersNeeded, owner,income);
    }
}
