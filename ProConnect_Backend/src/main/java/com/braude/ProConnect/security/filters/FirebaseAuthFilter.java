package com.braude.ProConnect.security.filters;

import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.security.authentications.FirebaseAuthentication;
import com.braude.ProConnect.services.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class FirebaseAuthFilter extends OncePerRequestFilter {
    private final AuthenticationManager authenticationManager;
    private final FirebaseAuth firebaseAuth= FirebaseAuth.getInstance();
    private final UserService userService;
    @Autowired
    public FirebaseAuthFilter(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var accessToken = request.getHeader("Authorization");
        System.out.println("In  " + this.getClass());

        if(accessToken != null)
        {
            try
            {
                FirebaseToken token = firebaseAuth.verifyIdToken(accessToken, true);
                String uid = token.getUid();
                User user = userService.getUser(uid);
                Authentication auth = new FirebaseAuthentication(uid, accessToken);
                auth = authenticationManager.authenticate(auth);
                SecurityContext securityContext = SecurityContextHolder.getContext();
                securityContext.setAuthentication(auth);
                HttpSession session = request.getSession();
                session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);
                filterChain.doFilter(request, response);
            } catch (Exception e)
            {
                System.out.println(e.getMessage());
                response.setStatus(401);
            }
        }
    }
}