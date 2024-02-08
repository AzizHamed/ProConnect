package com.braude.ProConnect.security;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.StringSchema;
import io.swagger.v3.oas.models.parameters.Parameter;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerMethod;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI(@Value("${springdoc.version}") String appVersion) {
        final String securitySchemeName = "bearerAuth";
        return new OpenAPI()
//                .addSecurityItem(new SecurityRequirement()
//                        .addList(securitySchemeName))
//                .components(new Components()
//                        .addSecuritySchemes(securitySchemeName, new SecurityScheme()
//                                .name(securitySchemeName)
//                                .type(SecurityScheme.Type.HTTP)
//                                .scheme("bearer")))

//                .components(new Components().addSecuritySchemes("basicScheme",
//                        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("basic")))
                .components(new Components()
                        .addSecuritySchemes("username", new SecurityScheme()
                                .type(SecurityScheme.Type.APIKEY)
                                .in(SecurityScheme.In.HEADER)
                                .name("username"))
                        .addSecuritySchemes("password", new SecurityScheme()
                                .type(SecurityScheme.Type.APIKEY)
                                .in(SecurityScheme.In.HEADER)
                                .name("password")))


                .info(new Info()
                        .title("ProConnect API")
                        .version(appVersion)
                        .description("This is the ProConnect API.\nProConnect is the final project at Braude College of Engineering by Hadi and Aziz.\n" +
                                "You can find the source code at [https://github.com/hadiDanial/ProConnect](https://github.com/hadiDanial/ProConnect).\n" +
                                "You must provide a valid Firebase authentication access token in order to use this API."));
    }


//    @Bean
//    public OperationCustomizer customGlobalHeaders() {
//
//        return (Operation operation, HandlerMethod handlerMethod) -> {
//
//            Parameter missingParam1 = new Parameter()
//                    .in(ParameterIn.HEADER.toString())
//                    .schema(new StringSchema())
//                    .name("username")
//                    .description("Username")
//                    .required(true);
//
//            Parameter missingParam2 = new Parameter()
//                    .in(ParameterIn.HEADER.toString())
//                    .schema(new StringSchema())
//                    .name("password")
//                    .description("Swagger password")
//                    .required(true);
//
//            operation.addParametersItem(missingParam1);
//            operation.addParametersItem(missingParam2);
//
//            return operation;
//        };
//    }
}
