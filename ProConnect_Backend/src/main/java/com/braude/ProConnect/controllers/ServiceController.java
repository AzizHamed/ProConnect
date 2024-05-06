package com.braude.ProConnect.controllers;

import com.braude.ProConnect.models.entities.Service;
import com.braude.ProConnect.models.entities.UserServiceEntity;
import com.braude.ProConnect.services.ServicesService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Services")
@Hidden
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
    public ResponseEntity<UserServiceEntity> createUserService(@RequestBody UserServiceEntity userServiceEntity) {
        UserServiceEntity newService = servicesService.addUserService(userServiceEntity);
        return new ResponseEntity<>(newService, HttpStatus.OK);
    }
    @PostMapping(value = "/create-user-services")
    public ResponseEntity<List<UserServiceEntity>> createUserServices(@RequestBody List<UserServiceEntity> userServiceEntities) {
        List<UserServiceEntity> newServices = servicesService.addUserServices(userServiceEntities);
        return new ResponseEntity<>(newServices, HttpStatus.OK);
    }
}
