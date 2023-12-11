package com.braude.ProConnect.models.page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPage {

    private int pageNumber = 0;

    private int pageSize = 5;

    private Sort.Direction sortDirection = Sort.Direction.DESC;

    private String sortBy = "datePosted";
}
