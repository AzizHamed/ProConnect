package com.braude.ProConnect.models.enums;

public enum WorkAreas {

    North,Haifa,Center,BeerShevaa,South;

    @Override
    public String toString() {
        switch (this){
            case Haifa -> {
                return  "Haifa";
            }
            case North -> {
                return  "North";
            }

            case South -> {
                return "South";
            }

            case Center -> {
                return "Center";
            }

            case BeerShevaa -> {
                return "BeerShevaa";
            }

            default -> {
                return "Area not found";
            }
        }
    }
}
