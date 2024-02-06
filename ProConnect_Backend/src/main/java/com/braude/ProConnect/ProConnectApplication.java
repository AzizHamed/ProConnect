package com.braude.ProConnect;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.Role;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@SpringBootApplication
public class ProConnectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProConnectApplication.class, args);
		try {
			ResourceLoader resourceLoader = new DefaultResourceLoader();
			Resource resource = resourceLoader.getResource("classpath:proconnect-6173c-firebase-adminsdk-msam9-1ff2a5bffd.json");
			FirebaseOptions options = new FirebaseOptions.Builder()
					.setCredentials(GoogleCredentials.fromStream(resource.getInputStream()))
					.build();

			FirebaseApp.initializeApp(options);
//			FirebaseAuth.getInstance().verifyIdToken("", true);
		}
		catch (FileNotFoundException ex){
			throw new ProConnectException("Firebase Service Account file not found.");
		}catch (IOException ex){
			throw new ProConnectException("Failed to read Firebase Service Account file.");
//		} catch (FirebaseAuthException e) {
//			throw new ProConnectException("Firebase Auth Exception: " + e.getMessage());
		}

	}

}
