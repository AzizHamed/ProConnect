package com.braude.ProConnect.services;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.embeddables.Name;
import com.braude.ProConnect.models.entities.Profession;
import com.braude.ProConnect.models.entities.Role;
import com.braude.ProConnect.models.entities.Searches;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.models.enums.AccountStatus;
import com.braude.ProConnect.models.enums.WorkAreas;
import com.braude.ProConnect.repositories.RoleRepository;
import com.braude.ProConnect.repositories.SearchesRepository;
import com.braude.ProConnect.repositories.UserRepository;
import com.braude.ProConnect.requests.UpdateProfileRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ProfessionService professionService;
    private final AuthenticationService authenticationService;

    private final SearchesRepository searchesRepository;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, AuthenticationService authenticationService, ProfessionService professionService, SearchesRepository searchesRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.authenticationService = authenticationService;
        this.professionService = professionService;
        this.searchesRepository = searchesRepository;
    }

    public User createUser(User user){
        if(!userRepository.existsById(user.getId())){
            user.setAccountStatus(AccountStatus.SETUP);
            return userRepository.save(user);
        }
        return null;
    }

    /**
     * Returns the User with the given userId if found, otherwise returns null.
     * @param userId User id to search for.
     * @return {@link User} with the given userId, or null if not found.
     */
    public User getUser(String userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    public boolean exists(String userId){
        return userRepository.existsById(userId);
    }
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public boolean addRole(String userId, long roleId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isEmpty())
            throw new ProConnectException("User not found.");
        Optional<Role> role = roleRepository.findById(roleId);
        if(role.isEmpty())
            throw new ProConnectException("Role not found.");
        User user = optionalUser.get();
        if(!user.addRole(role.get()))
            throw new ProConnectException("User already has this role.");
        userRepository.save(user);
        return true;
    }

    public List<User> createUsers(List<User> users) {
        List<User> newUsers = new ArrayList<>();
        for (User user : users) {
            newUsers.add(createUser(user));
        }
        return newUsers;
    }

    public UpdateProfileRequest updateProfile(UpdateProfileRequest request){
        User user = authenticationService.getAuthorizedUser();
        if(user == null)
            throw new ProConnectException("User not found.");
        user.setName(request.getName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRoles(request.getRoles());
        user.setAccountStatus(AccountStatus.ACTIVE);
        user = userRepository.save(user);
        return new UpdateProfileRequest(user.getName(), user.getPhoneNumber(), user.getAccountStatus(), user.getRoles());
    }

    public int getAllUsersNumber() {
        return userRepository.findAll().size();
    }

    public void rateUser(String userId, int rating) {
        User user = userRepository.findById(userId).get();
        user.addRating(rating);
        userRepository.save(user);
    }

    public List<User> findByWorkAreas(WorkAreas workAreas) {
        return userRepository.findByWorkAreas(workAreas);
    }



    public List<User> findUserByProfession(String professionName, WorkAreas workAreas) {
        Profession profession = professionService.getProfessionByName(professionName);
        Searches searches = searchesRepository.findAll().get(0);
        searches.setSearches(searches.getSearches()+1);
        searchesRepository.save(searches);
        return userRepository.findByProfessionAndWorkAreas(profession, workAreas);

    }

//    public void addProfession(String userId, String professionName) {
//        User user = userRepository.findById(userId).get();
//        user.getProfessions().add(professionService.getProfessionByName(professionName));
//        userRepository.save(user);
//    }


}
