package com.braude.ProConnect.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

/***
 * OpenAPI configuration. Configures the Swagger UI information and security schemes.
 */
@Configuration
@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Hadi Danial | Aziz Hamed",
                        url = "https://github.com/hadiDanial/proconnect",
                        email = "hadidanial97@gmail.com"
                ),
                title = "ProConnect API",
                description = "This is the ProConnect API.\n\nProConnect is the final project at Braude College of Engineering by Hadi and Aziz.\n\n" +
                        "You can find the source code at [https://github.com/hadiDanial/ProConnect](https://github.com/hadiDanial/ProConnect).\n\n" +
                        "You must provide a valid Firebase authentication id token in order to use this API.\n\n" +
                        "During development, you can access the API using the username: \"admin\" and the password \"proconnect\"",
                version = "0.3"
        ),
        security = {
                @SecurityRequirement(name = "bearerAuth")
        }

)
@SecurityScheme(name = "bearerAuth",
        description = "Firebase Auth IdToken",
        scheme = "basic",
        type = SecuritySchemeType.HTTP,
        in = SecuritySchemeIn.HEADER
)
public class OpenAPIConfig { }
