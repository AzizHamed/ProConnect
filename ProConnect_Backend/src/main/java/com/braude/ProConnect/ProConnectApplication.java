package com.braude.ProConnect;

import com.braude.ProConnect.models.entities.Role;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class ProConnectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProConnectApplication.class, args);
	}

}
