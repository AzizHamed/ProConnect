package com.braude.ProConnect.models.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "senderUser", referencedColumnName = "user_id")
//    @JsonBackReference
//    @JsonIgnore
    @NotNull
    private User senderUser;


    @ManyToOne()
    @JoinColumn(name = "receiverUser", referencedColumnName = "user_id")
//    @JsonBackReference
//    @JsonIgnore
    @NotNull
    private User receiverUser;

    @NotNull
    private double bid;

    @NotNull
    @JoinColumn(name = "job_id", referencedColumnName = "job_id")
    @ManyToOne()
    private Job job;

    private String title;

    private String description;


    private boolean isAccepted = false;


//    @Override
//    public String toString() {
//        return "JobOffer{" +
//                "id=" + id +
//                ", senderUser=" + senderUser.getName() +
//                ", receiverUser=" + receiverUser.getName() +
//                ", bid=" + bid +
//                ", title='" + title + '\'' +
//                ", description='" + description + '\'' +
//                ", isAccepted=" + isAccepted +
//                '}';
//    }
}
