package com.braude.ProConnect.security.authentications;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class FirebaseAuthentication extends UsernamePasswordAuthenticationToken {
    public FirebaseAuthentication(Object principal, Object credentials) {
        super(principal, credentials);
    }

    public FirebaseAuthentication(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(principal, credentials, authorities);
    }
}
