package com.braude.ProConnect.models.entities;

import com.braude.ProConnect.models.embeddables.DayAndTime;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;


    @NotNull
    private Date date;

    @ManyToOne(optional = false)
    @JoinColumn(name = "job_id",
    referencedColumnName = "job_id")
    private Job job;


    @ManyToOne(optional = false,
    fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;


    private int numberOfReports;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return numberOfReports == comment.numberOfReports && Objects.equals(commentId, comment.commentId) && Objects.equals(date, comment.date) && Objects.equals(job, comment.job) && Objects.equals(user, comment.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(commentId, date, job, user, numberOfReports);
    }
}
