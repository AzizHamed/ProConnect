package com.braude.ProConnect.requests;

import com.braude.ProConnect.models.entities.Job;
import com.braude.ProConnect.models.entities.Profession;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateJobRequest {
    private Job job;
    private Profession profession;
}
