package com.braude.ProConnect.models.embeddables;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserSkillKey implements Serializable {
    @Column(name = "user_id")
    private long userId;
    @Column(name = "skill_id")
    private long skillId;

    public UserSkillKey() {
    }

    public UserSkillKey(long userId, long skillId) {
        this.userId = userId;
        this.skillId = skillId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getSkillId() {
        return skillId;
    }

    public void setSkillId(long skillId) {
        this.skillId = skillId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserSkillKey that = (UserSkillKey) o;
        return userId == that.userId && skillId == that.skillId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, skillId);
    }
}
