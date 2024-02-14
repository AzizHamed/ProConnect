package com.braude.ProConnect.security.filters;

import com.braude.ProConnect.security.authentications.FirebaseAuthentication;
import com.braude.ProConnect.security.authentications.SwaggerAuthentication;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Intercepts all Swagger requests and verifies that they contain valid credentials. DEV ONLY.
 */
public class SwaggerAuthFilter extends OncePerRequestFilter {
    private final AuthenticationManager authenticationManager;
    private final String authToken = "Basic YWRtaW46cHJvY29ubmVjdA==";

    public SwaggerAuthFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        System.out.println("Security: In class SwaggerAuthFilter");
        var accessToken = request.getHeader("Authorization");

        if(accessToken != null && accessToken.equals(authToken))
        {
            try
            {
                Authentication auth = new SwaggerAuthentication("admin", "jwt");
                auth = authenticationManager.authenticate(auth);
                SecurityContext securityContext = SecurityContextHolder.getContext();
                securityContext.setAuthentication(auth);
                HttpSession session = request.getSession();
                session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);
            } catch (AuthenticationException e)
            {
                response.addHeader("Message", e.getMessage());
                //response.addHeader("Access-Control-Expose-Headers", "accept, authorization, content-type, x-requested-with, jwt");
                response.setStatus(401);
            }
        }
        filterChain.doFilter(request, response);
    }
}
