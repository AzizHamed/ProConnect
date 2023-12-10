package com.braude.ProConnect.models.entities;


//homeowner sends proposal to contractor

import com.braude.ProConnect.models.enums.JobProposalStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProposalToContractor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long proposal_id;

    private Date dayOfProposal;


    @ManyToOne(optional = false)
    @JoinColumn(name = "homeowner_id", referencedColumnName = "user_id")
    private User homeowner;



    @ManyToOne(optional = false)
    @JoinColumn(name = "contractor_id", referencedColumnName = "user_id")
    private User contractor;


    private double budget;

    private JobProposalStatus jobProposalStatus = JobProposalStatus.UnderReview;

    public ProposalToContractor(Date dayOfProposal, User homeowner, User contractor, double budget) {
        this.dayOfProposal = dayOfProposal;
        this.homeowner = homeowner;
        this.contractor = contractor;
        this.budget = budget;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProposalToContractor that = (ProposalToContractor) o;
        return Double.compare(that.budget, budget) == 0 && Objects.equals(proposal_id, that.proposal_id) && Objects.equals(dayOfProposal, that.dayOfProposal) && Objects.equals(homeowner, that.homeowner) && Objects.equals(contractor, that.contractor)  && jobProposalStatus == that.jobProposalStatus;
    }

    @Override
    public int hashCode() {
        return Objects.hash(proposal_id, dayOfProposal, homeowner, contractor, budget, jobProposalStatus);
    }
}
