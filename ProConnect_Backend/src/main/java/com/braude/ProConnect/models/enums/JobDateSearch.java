package com.braude.ProConnect.models.enums;


public enum JobDateSearch {
    AllTime,Month,Week,Day,Hour;

    @Override
    public String toString() {
        switch (this){
            case Day -> {
                return "Day";
            }

            case Week -> {
                return "Week";
            }

            case Month -> {
                return "Month";
            }

            case AllTime -> {
                return "AllTime";
            }

            case Hour -> {
                return "Hour";
            }
            default -> {
                return "unknown Date";
            }
        }
    }
}
