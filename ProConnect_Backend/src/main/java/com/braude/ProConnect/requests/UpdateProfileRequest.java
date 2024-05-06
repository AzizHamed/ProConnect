package com.braude.ProConnect.requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequest {
    private UpdatePersonalInfoRequest updatePersonalInfoRequest;
    private UpdateProfessionsRequest updateProfessionsRequest;
}
