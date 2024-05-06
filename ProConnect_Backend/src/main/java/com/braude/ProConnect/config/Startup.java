package com.braude.ProConnect.config;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.embeddables.Name;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.services.SearchesService;
import com.braude.ProConnect.services.UserService;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.gson.JsonObject;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@Component
public class Startup {
    private static UserService userService;

    private static SearchesService searchesService;

    @Autowired
    public Startup(UserService userService, SearchesService searchesService) {
        this.userService = userService;
        this.searchesService = searchesService;
    }





    private static String FIREBASE_CONFIG;

    @Value("${GOOGLE_CREDENTIALS}")
    public void setStaticName(String name) {
        FIREBASE_CONFIG = name;
    }

    public static String getFirebaseConfig() {
        return FIREBASE_CONFIG;
    }
    @PostConstruct
    void init() {
        System.out.println("App INIT");
        initializeFirebase();
        createAdminUserIfNotExists();
        searchesService.init();
    }

    private static void initializeFirebase() {
        try {
            FirebaseOptions options;

            if(FIREBASE_CONFIG == null || FIREBASE_CONFIG.isEmpty() || FIREBASE_CONFIG.equals("null")) {

                ResourceLoader resourceLoader = new DefaultResourceLoader();
                Resource resource = resourceLoader.getResource("classpath:proconnect-6173c-firebase-adminsdk-msam9-1ff2a5bffd.json");
                options = new FirebaseOptions.Builder()
                        .setCredentials(GoogleCredentials.fromStream(resource.getInputStream()))
                        .build();
             } else {
                JSONObject jsonObject = new JSONObject(FIREBASE_CONFIG);
                InputStream inputStream = new ByteArrayInputStream(jsonObject.toString().getBytes());
                options = new FirebaseOptions.Builder()
                        .setCredentials(GoogleCredentials.fromStream((inputStream)))
                        .build();
              }
            FirebaseApp.initializeApp(options);

        } catch (FileNotFoundException ex) {
            throw new ProConnectException("Firebase Service Account file not found.");
        } catch (IOException ex) {
            throw new ProConnectException("Failed to read Firebase Service Account file.");
        }
    }

    private static void createAdminUserIfNotExists() {
        String uid = "admin"; // Replace with your user ID

        // Verify the custom token to get the decoded token including expiration time
        if (!userService.exists(uid)) {
            User admin = new User();
            admin.setId(uid);
            admin.setEmail("admin@proconnect.com");
            admin.setName(new Name("ProConnect", "Admin"));
            userService.createUser(admin);
        }
    }
}