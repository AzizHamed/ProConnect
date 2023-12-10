package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.ProfessionalAppliment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessionalApplyRepository extends JpaRepository<ProfessionalAppliment,Long> {
}
