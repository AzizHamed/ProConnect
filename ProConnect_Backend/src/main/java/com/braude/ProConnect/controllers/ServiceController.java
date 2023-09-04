package com.braude.ProConnect.controllers;

import com.braude.ProConnect.models.entities.Service;
import com.braude.ProConnect.models.entities.UserService;
import com.braude.ProConnect.requests.RequestWithId;
import com.braude.ProConnect.services.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("services")
@CrossOrigin()
@Validated
public class ServiceController {
    private final ServicesService servicesService;

    @Autowired
    public ServiceController(ServicesService servicesService) {
        this.servicesService = servicesService;
    }

    @PostMapping(value = "/create-service")
    public ResponseEntity<Service> createService(String serviceName, long professionId) {
        Service newService = servicesService.addService(serviceName, professionId);
        return new ResponseEntity<>(newService, HttpStatus.OK);
    }
    @PostMapping(value = "/create-user-service")
    public ResponseEntity<UserService> createUserService(@RequestBody UserService userService) {
        UserService newService = servicesService.addUserService(userService);
        return new ResponseEntity<>(newService, HttpStatus.OK);
    }
    @PostMapping(value = "/create-user-services")
    public ResponseEntity<List<UserService>> createUserServices(@RequestBody List<UserService> userServices) {
        List<UserService> newServices = servicesService.addUserServices(userServices);
        return new ResponseEntity<>(newServices, HttpStatus.OK);
    }
}
