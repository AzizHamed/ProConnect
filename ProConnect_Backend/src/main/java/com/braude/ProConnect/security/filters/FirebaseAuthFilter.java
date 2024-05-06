package com.braude.ProConnect.security.filters;

import com.braude.ProConnect.config.SecurityConfig;
import com.braude.ProConnect.security.authentications.FirebaseAuthentication;
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
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Intercepts all requests and verifies that they contain a valid Firebase idToken.
 */
public class FirebaseAuthFilter extends OncePerRequestFilter {
    private final FirebaseAuth firebaseAuth = FirebaseAuth.getInstance();

    private final AuthenticationManager authenticationManager;

    public FirebaseAuthFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        if(requestURI.contains("users/create")
                || requestURI.contains("users/exists")
                || requestURI.equals("/users/get")
                || requestURI.contains("roles/get-roles")){
            filterChain.doFilter(request, response);
            return;
        }
        var accessToken = request.getHeader("Firebase_Authorization");
        if (accessToken != null) {
            try {
                FirebaseToken token = firebaseAuth.verifyIdToken(accessToken, true);
                String uid = token.getUid();
                Authentication auth = new FirebaseAuthentication(uid, "jwt");
                auth = authenticationManager.authenticate(auth);
                SecurityContext securityContext = SecurityContextHolder.getContext();
                securityContext.setAuthentication(auth);
                HttpSession session = request.getSession();
                session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);
            } catch (FirebaseAuthException e) {
                System.out.println(e.getMessage());
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
        filterChain.doFilter(request, response);
    }
}
