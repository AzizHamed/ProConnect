package com.braude.ProConnect.models.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Searches {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int searches=0;
}
