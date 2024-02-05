package com.braude.ProConnect.models.enums;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(using = EnumDeserializer.class)
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
