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

public class SwaggerAuthFilter extends OncePerRequestFilter {
    private final AuthenticationManager authenticationManager;

    public SwaggerAuthFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var username = request.getHeader("username");
        var password = request.getHeader("password");
        if(username != null && password != null)
        {
            try
            {
                SwaggerAuthentication a = new SwaggerAuthentication(username, password, null);
                a = (SwaggerAuthentication) authenticationManager.authenticate(a);
                SecurityContext securityContext = SecurityContextHolder.getContext();
                securityContext.setAuthentication(a);
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
