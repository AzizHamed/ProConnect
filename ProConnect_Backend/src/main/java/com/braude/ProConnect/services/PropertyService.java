package com.braude.ProConnect.services;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.embeddables.Location;
import com.braude.ProConnect.models.entities.Property;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.repositories.PropertyRepository;
import com.braude.ProConnect.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository, UserRepository userRepository) {
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
    }


    public Property createProperty(Property property) {
        User owner = UserService.getAuthorizedUser();
        property.setOwner(owner);
        return propertyRepository.save(property);
    }

    public Property getProperty(long propertyId){
        Optional<Property> optionalProperty = propertyRepository.findById(propertyId);
        if(!optionalProperty.isPresent())
            throw new ProConnectException("Property doesn't exist");
        Property property = optionalProperty.get();

        return property;
    }

    public List<Location> getLocations() {
        List<Location> locations = new ArrayList<>();
        List<Property> properties = getProperties();
        for (Property property : properties) {
            locations.add(property.getLocation());
        }
        return locations;
    }
    public List<Property> getProperties() {
        User user = UserService.getAuthorizedUser();
        return propertyRepository.findByOwner_Id(user.getId());
    }
}
