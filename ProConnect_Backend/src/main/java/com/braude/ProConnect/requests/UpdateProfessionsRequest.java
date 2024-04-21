package com.braude.ProConnect.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfessionsRequest {
    private long professionId;
    private float yearsOfExperience;
}
