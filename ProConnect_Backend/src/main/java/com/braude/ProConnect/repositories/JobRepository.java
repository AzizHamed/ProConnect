package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.entities.Profession;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.models.enums.WorkAreas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {
    List<Job> findAllByOwner(User owner);
    List<Job> findByOwner(User owner);

    List<Job> findAllByNeededProfessions(Profession profession);
    List<Job> findAllByNeededProfessionsAndOwnerWorkAreas(Profession profession, WorkAreas workAreas);
}
