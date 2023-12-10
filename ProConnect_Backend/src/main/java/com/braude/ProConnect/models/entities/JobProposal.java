package com.braude.ProConnect.models.entities;


// homeowners and contactors send job proposal to professional

import com.braude.ProConnect.models.enums.JobProposalStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
import java.util.Objects;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobProposal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String title;

    private String description;


    @NotNull
    @JoinColumn(name = "professional_id", referencedColumnName = "user_id")
    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, optional = false)
    private User professional;


    @NotNull
    @JoinColumn(name = "owner_id", referencedColumnName = "user_id")
    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, optional = false)
    private User owner;


    @ManyToMany
    @JoinColumn(name = "service_id", referencedColumnName = "user_service_id")
    private List<UserServiceEntity> services;

    public JobProposal(String title, String description, @NotNull User professional, @NotNull User owner, Service service, @NotNull Profession profession) {
        this.title = title;
        this.description = description;
        this.professional = professional;
        this.owner = owner;
    }

    @Enumerated(EnumType.STRING)
    private JobProposalStatus jobProposalStatus = JobProposalStatus.UnderReview;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JobProposal that = (JobProposal) o;
        return Objects.equals(id, that.id) && Objects.equals(title, that.title) && Objects.equals(description, that.description) && Objects.equals(professional, that.professional) && Objects.equals(owner, that.owner) && jobProposalStatus == that.jobProposalStatus;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, professional, owner, jobProposalStatus);
    }
}

