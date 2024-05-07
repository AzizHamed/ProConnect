package com.braude.ProConnect.controllers;

import com.braude.ProConnect.models.embeddables.Location;
import com.braude.ProConnect.models.entities.Property;
import com.braude.ProConnect.services.PropertyService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("properties")
@CrossOrigin()
@Validated
@Tag(name = "Properties")
@Hidden
public class PropertyController {
    private final PropertyService propertyService;

    @Autowired
    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }


    @PostMapping(value = "create-property")
    public ResponseEntity<Property> createProperty(@Valid @RequestBody Property property){
        Property newProperty = propertyService.createProperty(property);
        if(newProperty != null)
            return ResponseEntity.ok(newProperty);
        return ResponseEntity.badRequest().build();
    }

    @GetMapping(value = "get-properties")
    public ResponseEntity<List<Property>> getProperties(){
        return ResponseEntity.ok(propertyService.getProperties());
    }

    @GetMapping(value = "get-locations")
    public ResponseEntity<List<Location>> getLocations(){
        return ResponseEntity.ok(propertyService.getLocations());
    }
}
