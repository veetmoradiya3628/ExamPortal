package com.exam.examserver.controller;

import com.exam.examserver.dto.ResetPasswordDTO;
import com.exam.examserver.entity.Role;
import com.exam.examserver.entity.User;
import com.exam.examserver.entity.UserRole;
import com.exam.examserver.helper.ResponseHandler;
import com.exam.examserver.repo.RoleRepository;
import com.exam.examserver.repo.UserRepository;
import com.exam.examserver.service.ClassroomUserService;
import com.exam.examserver.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    private ClassroomUserService classroomUserService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/test")
    public String test(){
        return "Welcome to backend API of ExamPortal!";
    }

    /*
     * API to create new User with Roles
     */
    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody User user) throws Exception {
        if(userRepository.existsByUsername(user.getUsername())){
            logger.info("User already exists with username "+user.getUsername());
            return ResponseHandler.generateResponse("User already exists with username "+user.getUsername(), HttpStatus.CONFLICT, null);
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
        return this.userService.createUser(user, roles);
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

    @GetMapping("/{userId}/classrooms")
    public ResponseEntity<?> getClassroomsOfUserByUserId(@PathVariable("userId") String userId){
        return this.classroomUserService.getClassroomsByUserId(userId);
    }

    // reset password API
    @PostMapping("/{userId}/resetPassword")
    public ResponseEntity<?> resetPasswordForUser(@PathVariable("userId") String userId, @RequestBody ResetPasswordDTO resetPasswordDTO){
        logger.info("resetPasswordForUser called with " + resetPasswordDTO.toString());
        return this.userService.resetUserPassword(userId, resetPasswordDTO);
    }
}
