package com.braude.ProConnect.models.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Professions that a user has.
 */
@Entity
@IdClass(UserProfessionId.class)
@Table(name = "user_professions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfession {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Id
    @ManyToOne
    @JoinColumn(name = "profession_id")
    private Profession profession;
    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDate startDate;
    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDate endDate;
}
