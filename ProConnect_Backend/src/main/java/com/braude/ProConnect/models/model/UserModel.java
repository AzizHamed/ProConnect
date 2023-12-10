package com.braude.ProConnect.models.model;


import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.embeddables.Name;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {


    private Name name;

    private String phoneNumber;

    private String password;

    private String matchingPassword;


    private void checkPasswordMatching() throws ProConnectException {

        if(!password.equals(matchingPassword))
            throw new ProConnectException("unmatching passwords");

        return;
    }
}
