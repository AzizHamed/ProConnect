package com.braude.ProConnect.models.entities;


import com.braude.ProConnect.models.embeddables.UserSkillKey;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;

@Entity
@Table(name = "users_skills")
public class UserSkill {
    @EmbeddedId
    @Column(name = "user_skill_id", updatable = false)
    private UserSkillKey id;

    @ManyToOne
    @MapsId("id")
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @MapsId("id")
    @JoinColumn(name = "skill_id")
    private Skill skill;

    @Min(0)
    private float yearsOfExperience;

    @Min(0)
    private double salary;
}
