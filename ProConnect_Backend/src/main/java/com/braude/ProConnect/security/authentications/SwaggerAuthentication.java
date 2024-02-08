package com.braude.ProConnect.security.authentications;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class SwaggerAuthentication extends UsernamePasswordAuthenticationToken {
    public SwaggerAuthentication(Object principal, Object credentials) {
        super(principal, credentials);
    }

    public SwaggerAuthentication(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(principal, credentials, authorities);
    }
}
