package com.braude.ProConnect.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.IdClass;
import lombok.*;

import java.io.Serializable;

/**
 * Represents the id of a user profession, containing a user id and a profession id.
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class UserProfessionId implements Serializable {
    private User user;
    private Profession profession;
}
