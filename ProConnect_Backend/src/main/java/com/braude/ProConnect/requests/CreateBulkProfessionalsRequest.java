package com.braude.ProConnect.requests;

import com.braude.ProConnect.models.enums.WorkAreas;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CreateBulkProfessionalsRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String photoUrl;
    private WorkAreas workAreas;
    private long professionId;
    private LocalDate startDate;
    private List<String> services;
}
