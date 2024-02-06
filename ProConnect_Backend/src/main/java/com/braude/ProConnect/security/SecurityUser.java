package com.braude.ProConnect.security;

import com.braude.ProConnect.models.enums.AccountStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.braude.ProConnect.models.entities.Role;
import com.braude.ProConnect.models.entities.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class SecurityUser implements UserDetails
{
    private final User user;

    public SecurityUser(User user)
    {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities()
    {
        List<GrantedAuthority> authorities = new ArrayList<>();
        List<Role> roles;
        try
        {
            roles = user.getRoles();
            if(roles == null || roles.size() == 0)
                return null;

        } catch (NullPointerException e)
        {
            return null;
        }
        for(Role role : user.getRoles())
        {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getCode()));
//            for(Authority auth : role.getAuthorities())
//            {
//                authorities.add(new SimpleGrantedAuthority(auth.getAuthorityIdentifier()));
//            }
        }
        return authorities;
    }

    @Override
    public String getPassword()
    {
        return null;
    }

    @Override
    public String getUsername()
    {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired()
    {
        return true;
    }

    @Override
    public boolean isAccountNonLocked()
    {
        return user.getAccountStatus() != AccountStatus.DISABLED;
    }

    @Override
    public boolean isCredentialsNonExpired()
    {
        return true;
    }

    @Override
    public boolean isEnabled()
    {
        return isAccountNonLocked();
    }

    public User getUser()
    {
        return user;
    }
}