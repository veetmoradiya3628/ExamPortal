package com.exam.examserver.controller;

import com.exam.examserver.entity.Role;
import com.exam.examserver.entity.User;
import com.exam.examserver.entity.UserRole;
import com.exam.examserver.repo.RoleRepository;
import com.exam.examserver.repo.UserRepository;
import com.exam.examserver.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/test")
    public String test(){
        return "Welcome to backend API of ExamPortal!";
    }

    // creating user
    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody User user) throws Exception {
        System.out.println(user.toString());
        if(userRepository.existsByUsername(user.getUsername())){
            Map<String, String> mpp = new HashMap<>();
            mpp.put("message", "User already exists with username "+user.getUsername());
            logger.info("User already exists with username "+user.getUsername());
            return ResponseEntity.badRequest().body(mpp);
        }

        user.setProfileImage("default.png");
        // encoding password with BCrypt
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

        Set<UserRole> roles = new HashSet<>();
        Role role = this.roleRepository.findByRoleName(user.getRoleName());
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        roles.add(userRole);
        return ResponseEntity.ok(this.userService.createUser(user, roles));
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok(this.userRepository.findAll());
    }

    // get user by username
    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable("username") String username){
        return this.userService.getUserByUsername(username);
    }

    // get user by userId
    @GetMapping("getUserById/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable("userId") String userId) {
        return this.userService.getUserById(userId);
    }

    // delete user by ID
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") String userId){
        this.userService.deleteUser(userId);
    }

    // update user by ID
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUserById(@PathVariable("userId") String userId, @RequestBody User user) {
        return this.userService.updateUserById(userId, user);
    }

    // update user status
    @PostMapping("/{userId}/{status}")
    public ResponseEntity<?> updateUserStatue(@PathVariable("userId") String userId, @PathVariable Boolean status){
        return this.userService.updateUserStatus(userId, status);
    }
}
