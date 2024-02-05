package com.braude.ProConnect.models.enums;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;

public class EnumDeserializer<E extends Enum<E>> extends JsonDeserializer<E> {

    private final Class<E> enumType;

    public EnumDeserializer(Class<E> enumType) {
        this.enumType = enumType;
    }

    @Override
    public E deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        try {
            String value = p.getValueAsString().toUpperCase();
            return Enum.valueOf(enumType, value);
        } catch (IllegalArgumentException e) {
            // Handle invalid enum value as needed
            String errorMessage = String.format("Invalid value '%s' for enum type '%s'", p.getValueAsString(), enumType.getSimpleName());
            throw new ProConnectException(errorMessage);
        }
    }
}
