package com.braude.ProConnect.models.enums;

public enum JobStatus {
    DRAFT,
    PUBLISHED,
    IN_PROGRESS,
    CANCELLED,
    UNDER_REVIEW,
    REQUIRES_ADJUSTMENTS,
    FINISHED;

    public String toString() {
        switch (this) {
            case DRAFT:
                return "Draft";
            case PUBLISHED:
                return "Published";
            case IN_PROGRESS:
                return "In Progress";
            case CANCELLED:
                return "Cancelled";
            case UNDER_REVIEW:
                return "Under Review";
            case REQUIRES_ADJUSTMENTS:
                return "Requires Adjustments";
            case FINISHED:
                return "Finished";
            default:
                return "Unknown Status";
        }
    }
}
