package com.braude.ProConnect.models.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "profession_id")
    private Profession profession;
    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDate startDate;
    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDate endDate;

    @ElementCollection
    @CollectionTable(name = "user_profession_services", joinColumns = {
            @JoinColumn(name = "user_id", referencedColumnName = "user_id"),
            @JoinColumn(name = "profession_id", referencedColumnName = "profession_id")
    })
    @Column(name = "service")
    private List<String> services = new ArrayList<>();
}
