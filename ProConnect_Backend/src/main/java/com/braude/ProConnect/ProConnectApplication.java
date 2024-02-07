package com.braude.ProConnect;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.embeddables.Name;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.services.UserService;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

@SpringBootApplication
public class ProConnectApplication {
	private static UserService userService;

	@Autowired
	public ProConnectApplication(UserService userService) {
		ProConnectApplication.userService = userService;
	}

	public static void main(String[] args) {
		initializeFirebase();
		SpringApplication.run(ProConnectApplication.class, args);
//		createTestIdToken();
	}

	private static void initializeFirebase() {
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

	private static void createTestIdToken() {
		try {
			String uid = "admin"; // Replace with your user ID
			String customToken = null;
			customToken = FirebaseAuth.getInstance().createCustomTokenAsync(uid).get();

			// Verify the custom token to get the decoded token including expiration time
			if(!userService.exists(uid)){
				User admin = new User();
				admin.setId(uid);
				admin.setEmail("admin@proconnect.com");
				admin.setName(new Name("ProConnect", "Admin"));
				userService.createUser(admin);
			}
			// Print the decoded token (including expiration time)
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		} catch (ExecutionException e) {
			throw new RuntimeException(e);
		}
	}
}
