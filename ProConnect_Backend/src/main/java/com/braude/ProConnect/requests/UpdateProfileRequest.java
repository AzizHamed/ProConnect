package com.braude.ProConnect.requests;

import com.braude.ProConnect.models.embeddables.Name;
import com.braude.ProConnect.models.entities.Role;
import com.braude.ProConnect.models.enums.AccountStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequest {
    private Name name;
    private String phoneNumber;
    private AccountStatus accountStatus;
    private List<Role> roles;
    private String photoUrl;
}