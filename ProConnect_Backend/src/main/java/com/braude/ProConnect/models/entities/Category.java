//package com.braude.ProConnect.models.entities;
//
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.util.List;
//
//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class Category {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    public long id;
//
//    private String name;
//
//
//    @OneToMany(mappedBy = "category")
//    private List<Profession> professionList;
//}