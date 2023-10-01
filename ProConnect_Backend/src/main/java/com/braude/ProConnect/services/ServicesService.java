package com.braude.ProConnect.services;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.entities.Profession;
import com.braude.ProConnect.models.entities.Service;
import com.braude.ProConnect.models.entities.UserServiceEntity;
import com.braude.ProConnect.repositories.ProfessionRepository;
import com.braude.ProConnect.repositories.ServiceRepository;
import com.braude.ProConnect.repositories.UserServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServicesService {
    private final ServiceRepository serviceRepository;
    private final UserServiceRepository userServiceRepository;
    private final ProfessionRepository professionRepository;

    @Autowired
    public ServicesService(ServiceRepository serviceRepository, UserServiceRepository userServiceRepository, ProfessionRepository professionRepository) {
        this.serviceRepository = serviceRepository;
        this.userServiceRepository = userServiceRepository;
        this.professionRepository = professionRepository;
    }


    public Service addService(String name, long professionId) {
        Optional<Profession> profession = professionRepository.findById(professionId);
        if(!profession.isPresent())
            throw new ProConnectException("Profession doesn't exist.");
        Service skill = new Service(name, profession.get());
        return serviceRepository.save(skill);
    }

    public UserServiceEntity addUserService(UserServiceEntity userServiceEntity) {
        return userServiceRepository.save(userServiceEntity);
    }

    public List<UserServiceEntity> addUserServices(List<UserServiceEntity> userServiceEntities) {
        List<UserServiceEntity> services = new ArrayList<>();
        for (UserServiceEntity userServiceEntity : userServiceEntities) {
            services.add(addUserService(userServiceEntity));
        }
        return services;
    }
}
