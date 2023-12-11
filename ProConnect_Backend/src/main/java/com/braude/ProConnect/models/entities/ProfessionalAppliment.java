package com.braude.ProConnect.models.entities;


import com.braude.ProConnect.models.enums.JobProposalStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;


//professional appliment for contractor to work with
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfessionalAppliment {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotNull
    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "professional_id", referencedColumnName = "user_id")
    private User professional;


    @NotNull
    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "contractor_id", referencedColumnName = "user_id")
    private User contractor;

    @Enumerated(EnumType.STRING)
    private JobProposalStatus jobProposalStatus = JobProposalStatus.UnderReview;

    public ProfessionalAppliment(@NotNull User professional, @NotNull User contractor) {
        this.professional = professional;
        this.contractor = contractor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProfessionalAppliment that = (ProfessionalAppliment) o;
        return Objects.equals(id, that.id) && Objects.equals(professional, that.professional) && Objects.equals(contractor, that.contractor) && jobProposalStatus == that.jobProposalStatus;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, professional, contractor, jobProposalStatus);
    }
}
