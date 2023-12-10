package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.JobProposal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobProposalRepository extends JpaRepository<JobProposal,Long> {
}
