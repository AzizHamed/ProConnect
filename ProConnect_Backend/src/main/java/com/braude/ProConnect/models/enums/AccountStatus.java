package com.braude.ProConnect.models.enums;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(using = EnumDeserializer.class)
public enum AccountStatus {
    SETUP, ACTIVE, DISABLED
}
