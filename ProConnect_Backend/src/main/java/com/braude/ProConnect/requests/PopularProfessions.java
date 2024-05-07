package com.braude.ProConnect.requests;

import com.braude.ProConnect.models.entities.Profession;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class PopularProfessions implements Comparable<PopularProfessions> {
    private Profession profession;
    private int count;

    @Override
    public int compareTo(PopularProfessions o) {
        return Integer.compare(this.count, o.count);
    }
}
