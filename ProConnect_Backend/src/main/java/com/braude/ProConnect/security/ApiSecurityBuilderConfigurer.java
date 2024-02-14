package com.braude.ProConnect.security;

import com.braude.ProConnect.security.filters.FirebaseAuthFilter;
import com.braude.ProConnect.security.filters.SwaggerAuthFilter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.HttpSecurityBuilder;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;


public class ApiSecurityBuilderConfigurer<H extends HttpSecurityBuilder<H>>
        extends AbstractHttpConfigurer<ApiSecurityBuilderConfigurer<H>, H> {

    /**
     * Configures the Authentication Manager object and builds the security filter chain. Called automatically by Spring
     */
    @Override
    public void configure(H builder) throws Exception {
        AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
        builder.addFilterAfter(new FirebaseAuthFilter(authenticationManager), BasicAuthenticationFilter.class)
                .addFilterAfter(new SwaggerAuthFilter(authenticationManager), FirebaseAuthFilter.class) // TODO: DEV ONLY, delete on build
        ;
    }

}