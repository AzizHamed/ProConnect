package com.braude.ProConnect.requests;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CreateJobsBulkRequest {
    private int budget;
    private String description;
    private String title;
    private String ownerId;
    private Long neededProfessionId;
    private List<String> photos;
}
