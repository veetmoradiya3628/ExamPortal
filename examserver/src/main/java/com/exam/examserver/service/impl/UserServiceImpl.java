package com.exam.examserver.service.impl;

import com.exam.examserver.entity.User;
import com.exam.examserver.entity.UserRole;
import com.exam.examserver.repo.RoleRepository;
import com.exam.examserver.repo.UserRepository;
import com.exam.examserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    // Creating User
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {
        User localUser = this.userRepository.findByUsername(user.getUsername());
        if(localUser != null){
            throw new Exception("User already present!!");
        }else{
            // user create
            for(UserRole userRole: userRoles){
                roleRepository.save(userRole.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            localUser = this.userRepository.save(user);
        }
        return localUser;
    }

    // get user by username
    @Override
    public User getUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(String userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public ResponseEntity<?> updateUserStatus(String userId, Boolean status) {
        Optional<User> userPresent = this.userRepository.findById(userId);
        if(userPresent.isPresent()){
            User user = userPresent.get();
            user.setEnabled(status);
            this.userRepository.save(user);
            return ResponseEntity.ok(user);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<?> getUserById(String userId) {
        Optional<User> userPresent = this.userRepository.findById(userId);
        if(userPresent.isPresent()){
            return ResponseEntity.ok(userPresent.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<?> updateUserById(String userId, User user) {
        Optional<User> userPresent = this.userRepository.findById(userId);
        if(userPresent.isPresent()){
            User userToUpdate = userPresent.get();
            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setUsername(user.getUsername());
            userToUpdate.setFirstName(user.getFirstName());
            userToUpdate.setLastName(user.getLastName());
            userToUpdate.setPhone(user.getPhone());
            User savedUserInRepo = this.userRepository.save(userToUpdate);
            return ResponseEntity.ok(savedUserInRepo);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}
