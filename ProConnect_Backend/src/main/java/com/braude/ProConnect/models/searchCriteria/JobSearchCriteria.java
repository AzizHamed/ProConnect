package com.braude.ProConnect.models.searchCriteria;


import com.braude.ProConnect.models.entities.Profession;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.models.enums.JobDateSearch;
import com.braude.ProConnect.models.enums.JobStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobSearchCriteria {

    private double budget=0;


    private JobStatus jobStatus;

    private JobDateSearch jobDateSearch = JobDateSearch.AllTime;
}
