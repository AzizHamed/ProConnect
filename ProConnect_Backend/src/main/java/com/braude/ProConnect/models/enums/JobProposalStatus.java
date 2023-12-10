package com.braude.ProConnect.models.enums;

public enum JobProposalStatus {
    Accepted, Rejected, UnderReview;

    @Override
    public String toString() {
        switch (this){
            case Accepted :
                return "Accepted";

            case Rejected:
                return "Rejected";

            case UnderReview:
                return "UnderReview";

            default:
                return "unknown status";
        }
    }
}
