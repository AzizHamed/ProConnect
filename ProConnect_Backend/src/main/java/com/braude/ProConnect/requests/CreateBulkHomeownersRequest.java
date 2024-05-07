package com.braude.ProConnect.requests;

import com.braude.ProConnect.models.enums.WorkAreas;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CreateBulkHomeownersRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String photoUrl;
    private WorkAreas workAreas;

}
