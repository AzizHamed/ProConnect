package com.braude.ProConnect.repositories;


import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.enums.JobDateSearch;
import com.braude.ProConnect.models.page.JobPage;
import com.braude.ProConnect.models.searchCriteria.JobSearchCriteria;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JobCriteriaRepository {

    private final EntityManager entityManager;
    private final CriteriaBuilder criteriaBuilder;

    public JobCriteriaRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.criteriaBuilder = entityManager.getCriteriaBuilder();
    }

    public Page<Job> findAllWithFilters(JobSearchCriteria jobSearchCriteria, JobPage jobPage){
        CriteriaQuery<Job> criteriaQuery = criteriaBuilder.createQuery(Job.class);

        //select * from Job
        Root<Job> root = criteriaQuery.from(Job.class);
        //WHERE job page
        Predicate predicate;
        predicate = getPredicates(jobSearchCriteria,root);

        criteriaQuery.where(predicate);
        criteriaQuery.orderBy(criteriaBuilder.desc(root.get("datePosted")));
        TypedQuery<Job> query = entityManager.createQuery(criteriaQuery);
        query.setFirstResult(jobPage.getPageNumber() * jobPage.getPageSize());
        query.setMaxResults(jobPage.getPageSize());

        System.out.println(query.getResultList());

        Pageable pageable = getPageable(jobPage);

        long jobCount = query.getResultList().stream().count();

        return new PageImpl<>(query.getResultList(), pageable, jobCount);
    }

    private Pageable getPageable(JobPage jobPage) {
        Sort sort = Sort.by(jobPage.getSortDirection(), jobPage.getSortBy());
        return PageRequest.of(jobPage.getPageNumber(),jobPage.getPageSize(), sort);


    }


    private Predicate getPredicates(JobSearchCriteria jobSearchCriteria, Root<Job> root) {

        List<Predicate> list = new ArrayList<>();
        if(jobSearchCriteria.getJobStatus()!=null){
            Predicate predicate = criteriaBuilder.equal(root.get("jobStatus"),jobSearchCriteria.getJobStatus());
            list.add(predicate);
        }
        if(jobSearchCriteria.getBudget()>0){
            Predicate predicate = criteriaBuilder.ge(root.get("budget"),jobSearchCriteria.getBudget());
            list.add(predicate);
        }


        if(!jobSearchCriteria.getJobDateSearch().equals(JobDateSearch.AllTime)){
            switch (jobSearchCriteria.getJobDateSearch()){
                case Month -> {
                    Predicate predicate = criteriaBuilder.greaterThan(root.get("datePosted"), OffsetDateTime.now().minusMonths(1));
                    list.add(predicate);
                }

                case Week -> {
                    Predicate predicate = criteriaBuilder.greaterThan(root.get("datePosted"), OffsetDateTime.now().minusWeeks(1));
                    list.add(predicate);
                }

                case Day -> {
                    Predicate predicate = criteriaBuilder.greaterThan(root.get("datePosted"), OffsetDateTime.now().minusDays(1));
                    list.add(predicate);
                }

                case Hour -> {
                    Predicate predicate = criteriaBuilder.greaterThan(root.get("datePosted"), OffsetDateTime.now().minusHours(1));
                    list.add(predicate);
                }
            }

        }

        return criteriaBuilder.and(list.toArray(new Predicate[0]));

    }
}
