package com.braude.ProConnect.requests;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class CreateRatingsBulkRequest {
    private String reviewerId;
    private String reviewedId;
    private int rating;
}
