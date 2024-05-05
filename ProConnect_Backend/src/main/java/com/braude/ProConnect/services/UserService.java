package com.braude.ProConnect.services;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.embeddables.Name;
import com.braude.ProConnect.models.entities.Profession;
import com.braude.ProConnect.models.entities.Role;
import com.braude.ProConnect.models.entities.Searches;
import com.braude.ProConnect.models.entities.User;
import com.braude.ProConnect.models.entities.UserProfession;
import com.braude.ProConnect.models.enums.AccountStatus;
import com.braude.ProConnect.models.enums.WorkAreas;
import com.braude.ProConnect.repositories.RoleRepository;
import com.braude.ProConnect.repositories.UserProfessionsRepository;
import com.braude.ProConnect.repositories.SearchesRepository;
import com.braude.ProConnect.repositories.UserRepository;
import com.braude.ProConnect.requests.UpdatePersonalInfoRequest;
import com.braude.ProConnect.requests.UpdateProfessionsRequest;
import com.braude.ProConnect.requests.UpdateProfileRequest;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserProfessionsRepository userProfessionsRepository;
    private final RoleRepository roleRepository;
    private final ProfessionService professionService;
    private final AuthenticationService authenticationService;
    private final ReviewService reviewService;

    private final SearchesRepository searchesRepository;

    @Autowired
    public UserService(UserRepository userRepository, UserProfessionsRepository userProfessionsRepository, RoleRepository roleRepository, 
                       AuthenticationService authenticationService, ProfessionService professionService, SearchesRepository searchesRepository, ReviewService reviewService) {
        this.userRepository = userRepository;
        this.userProfessionsRepository = userProfessionsRepository;
        this.roleRepository = roleRepository;
        this.authenticationService = authenticationService;
        this.professionService = professionService;
        this.reviewService = reviewService;
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
        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElse(null);
        if(user == null) return null;
        setUserRatings(user);
        return user;
    }
    public List<User> getAllUsers(){
        List<User> users = userRepository.findAll();
        for (User user : users) {
            setUserRatings(user);
        }
        return users;
    }

    private void setUserRatings(User user) {
        Float averageRatingByReviewedUser = reviewService.getAverageRatingByReviewedUser(user);
        Integer countRatingByReviewedUser = reviewService.getCountRatingByReviewedUser(user);
        if(averageRatingByReviewedUser == null)
            averageRatingByReviewedUser = 0f;
        if(countRatingByReviewedUser == null)
            countRatingByReviewedUser = 0;
        user.setAverageRating(averageRatingByReviewedUser);
        user.setRatingsCount(countRatingByReviewedUser);
    }

    public boolean exists(String userId){
        return userRepository.existsById(userId);
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

    public User updatePersonalInfo(UpdatePersonalInfoRequest request){
        User user = authenticationService.getAuthorizedUser();
        if(user == null)
            throw new ProConnectException("User not found.");
        Name name = request.getName();
        name.toUpperCase();
        user.setName(name);
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRoles(request.getRoles());
        user.setAccountStatus(AccountStatus.ACTIVE);
        user.setPhotoUrl(request.getPhotoUrl());
        user = userRepository.save(user);
        return user;
    }
    public User updateProfessions(UpdateProfessionsRequest request){
        User user = authenticationService.getAuthorizedUser();
        if(user.getUserProfessions() != null) {
            user.getUserProfessions().clear();
        } else {
            user.setUserProfessions(new ArrayList<>());
        }
        UserProfession[] professions = request.getProfessions();
        if(professions != null) {
            for (UserProfession userProfessionToAdd : professions) {
                Profession profession = professionService.getProfessionById(userProfessionToAdd.getProfession().getId());
                if (profession == null)
                    throw new ProConnectException("Profession not found.");
                user.getUserProfessions().add(new UserProfession(user, profession, userProfessionToAdd.getStartDate(), userProfessionToAdd.getEndDate(), userProfessionToAdd.getServices()));

            }
        }
        WorkAreas workAreas = request.getWorkAreas();
        if(workAreas == null) workAreas = WorkAreas.North;
        user.setWorkAreas(workAreas);
        user = userRepository.save(user);
        return user;
    }

    public User updateProfile(UpdateProfileRequest updateProfileRequest) {
        updatePersonalInfo(updateProfileRequest.getUpdatePersonalInfoRequest());
        return updateProfessions(updateProfileRequest.getUpdateProfessionsRequest());
    }

    public int getAllUsersNumber() {
        return userRepository.findAll().size();
    }

    public List<UserProfession> getUserProfessions() {
        return userProfessionsRepository.findAllByUser(authenticationService.getAuthorizedUser());
    }

    public List<UserProfession> getUserProfessions(String userId) {
        return userProfessionsRepository.findAllByUser(userRepository.findById(userId).get());
    }

//    public void addProfession(String userId, String professionName) {
//        User user = userRepository.findById(userId).get();
//        user.getProfessions().add(professionService.getProfessionByName(professionName));
//        userRepository.save(user);
//    }
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
        List<UserProfession> userProfessions = userProfessionsRepository.findAllByProfession(profession);
        List<User> users = userProfessions.stream().map(UserProfession::getUser).toList()
                .stream().filter(user -> {
                    WorkAreas userWorkAreas = user.getWorkAreas();
                    if(workAreas == null || userWorkAreas == null) return false;
                    return userWorkAreas.equals(workAreas);
                }).toList();

        Searches searches = searchesRepository.findAll().get(0);
        searches.setSearches(searches.getSearches()+1);
        searchesRepository.save(searches);
        List<User> dtos = new ArrayList<>();
        for (User user : users) {
            try {
                dtos.add((User) user.clone());
            } catch (CloneNotSupportedException e) {
                throw new RuntimeException(e);
            }
        }
        return dtos;
//        return userRepository.findByProfessionAndWorkAreas(profession, workAreas);

    }

    public List<User> getUsersByEmails(String[] emails) {

        List<User> users = new ArrayList<>();

        for (String email : emails) {

            users.add(userRepository.findByEmail(email));
        }

        return users;
    }
}