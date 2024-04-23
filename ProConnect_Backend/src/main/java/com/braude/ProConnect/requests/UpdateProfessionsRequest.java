package com.braude.ProConnect.requests;

import com.braude.ProConnect.models.entities.UserProfession;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfessionsRequest {
    private UserProfession[] professions;
}
