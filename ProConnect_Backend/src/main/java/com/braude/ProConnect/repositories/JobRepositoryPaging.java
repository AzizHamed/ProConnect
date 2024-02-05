package com.braude.ProConnect.repositories;

import com.braude.ProConnect.models.entities.Job;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepositoryPaging extends PagingAndSortingRepository<Job,Long> {

    /*List<Job> findByUserId(String userId);*/
}
