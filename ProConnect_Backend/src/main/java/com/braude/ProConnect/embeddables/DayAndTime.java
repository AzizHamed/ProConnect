package com.braude.ProConnect.embeddables;

import java.time.DayOfWeek;
import java.time.LocalTime;

public class DayAndTime {

    private DayOfWeek day;

    private LocalTime start;
    private LocalTime finish;

    public DayAndTime(DayOfWeek day, LocalTime start, LocalTime finish) {
        this.day = day;
        this.start = start;
        this.finish = finish;
    }

    public DayAndTime() {
        super();
    }

    public DayOfWeek getDay() {
        return day;
    }

    public LocalTime getStart() {
        return start;
    }

    public void setDay(DayOfWeek day) {
        this.day = day;
    }

    public void setStart(LocalTime start) {
        this.start = start;
    }

    public void setFinish(LocalTime finish) {
        this.finish = finish;
    }

    public LocalTime getFinish() {
        return finish;
    }
}
