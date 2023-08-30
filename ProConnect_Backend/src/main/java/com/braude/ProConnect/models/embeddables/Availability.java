package com.braude.ProConnect.models.embeddables;

import java.util.List;

public class Availability {

    private List<DayAndTime> availability;

    public Availability(List<DayAndTime> availability) {
        this.availability = availability;
    }

    public Availability() {
    }

    public List<DayAndTime> getAvailability() {
        return availability;
    }

    public void setAvailability(List<DayAndTime> availability) {
        this.availability = availability;
    }
}
