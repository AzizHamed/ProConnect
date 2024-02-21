package com.braude.ProConnect.requests;

import com.braude.ProConnect.models.entities.Job;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateJobRequest {
    private Job job;
    private long propertyId;
}
