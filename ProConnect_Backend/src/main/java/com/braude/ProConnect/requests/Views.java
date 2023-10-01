package com.braude.ProConnect.requests;

/**
 * This class is used to define which fields are visible
 * and which are not using the @JsonView attribute.
 * Mark the class with {@code @JsonView(Views.Public.class)}
 * Mark the hidden fields with {@code @JsonView(Views.Internal.class)}
 * In the controller, marker
 */
public class Views {
    public static class Public {}
    public static class Internal extends Public {}
}
