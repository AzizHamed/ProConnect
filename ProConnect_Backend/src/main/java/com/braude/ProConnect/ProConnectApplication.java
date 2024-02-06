package com.braude.ProConnect;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@SpringBootApplication
public class ProConnectApplication {

	public static void main(String[] args) {
		InitializeFirebase();
		SpringApplication.run(ProConnectApplication.class, args);
	}

	private static void InitializeFirebase() {
		try {
			ResourceLoader resourceLoader = new DefaultResourceLoader();
			Resource resource = resourceLoader.getResource("classpath:proconnect-6173c-firebase-adminsdk-msam9-1ff2a5bffd.json");
			FirebaseOptions options = new FirebaseOptions.Builder()
					.setCredentials(GoogleCredentials.fromStream(resource.getInputStream()))
					.build();
			FirebaseApp.initializeApp(options);
		}
		catch (FileNotFoundException ex){
			throw new ProConnectException("Firebase Service Account file not found.");
		}
		catch (IOException ex){
			throw new ProConnectException("Failed to read Firebase Service Account file.");
		}
	}
}
