package com.exam.examserver.service.impl;

import com.exam.examserver.dto.ResetPasswordDTO;
import com.exam.examserver.dto.UserDTO;
import com.exam.examserver.entity.Organization;
import com.exam.examserver.entity.User;
import com.exam.examserver.entity.UserRole;
import com.exam.examserver.helper.ResponseHandler;
import com.exam.examserver.repo.ClassroomUserRepository;
import com.exam.examserver.repo.OrganizationRepository;
import com.exam.examserver.repo.RoleRepository;
import com.exam.examserver.repo.UserRepository;
import com.exam.examserver.service.ClassroomUserService;
import com.exam.examserver.service.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    /*
     * Method supports User Creation with Role
     */
    @Override
    public ResponseEntity<?> createUser(User user, Set<UserRole> userRoles) throws Exception {
        User localUser = this.userRepository.findByUsername(user.getUsername());
        if(localUser != null){
            return ResponseHandler.generateResponse("User with username "+user.getUsername()+" already exists!!", HttpStatus.FOUND, null);
        }else{
            // user create
            for(UserRole userRole: userRoles){
                roleRepository.save(userRole.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            localUser = this.userRepository.save(user);
        }
        return ResponseHandler.generateResponse("User created with ID : "+localUser.getUserId(), HttpStatus.OK, localUser);
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

    @Override
    public ResponseEntity<?> getUserByOrgId(String orgId, String rolePara) {
        Optional<Organization> orgPresent = this.organizationRepository.findById(orgId);
        if (orgPresent.isPresent()) {
            Organization org = orgPresent.get();
            List<User> users = this.userRepository.findByOrganization(org);
            List<UserDTO> responseUsers = new ArrayList<>();
            users.forEach(user -> {
                UserDTO uD = this.modelMapper.map(user, UserDTO.class);
                List<String> roleOfUser = new ArrayList<>();
                user.getUserRoles().forEach(role -> {
                    roleOfUser.add(role.getRole().getRoleName());
                });
                uD.setRoles(roleOfUser);
                responseUsers.add(uD);
            });

            ArrayList<UserDTO> filtered = new ArrayList<>();

            // filter based on role
            if (!responseUsers.isEmpty()) {
                responseUsers.forEach(user -> {
                    if (rolePara != null && !rolePara.isEmpty() && user.getRoles().contains(rolePara.toUpperCase())) {
                        filtered.add(user);
                    }
                });
            }
            if (!filtered.isEmpty()){
                return ResponseHandler.generateResponse(null, HttpStatus.OK, filtered);
            }
            return ResponseHandler.generateResponse(null, HttpStatus.OK, responseUsers);
        }
        return ResponseHandler.generateResponse("Organization with id : "+orgId+" does not exists", HttpStatus.NOT_FOUND, null);
    }

    @Override
    public ResponseEntity<?> resetUserPassword(String userId, ResetPasswordDTO resetPasswordDTO) {
        try {
            logger.info("resetUserPassword called...");
            // userId validation
            if (this.isUserPresentById(userId)) {
                logger.info("new password : " + resetPasswordDTO.getNewPassword() + ", confirm password : " + resetPasswordDTO.getConfirmPassword());
                // newPasswordValidation
                if (resetPasswordDTO.getNewPassword().equals(resetPasswordDTO.getConfirmPassword())) {
                    // current password check
                    User user = this.userRepository.findById(userId).get();
                    String dbPassword = user.getPassword();
                    String requestPassword = this.bCryptPasswordEncoder.encode(resetPasswordDTO.getNewPassword());
                    logger.info("db stored password : " + dbPassword + " requestPassword : " + requestPassword);
                    if (this.bCryptPasswordEncoder.matches(resetPasswordDTO.getCurrentPassword(), user.getPassword())) {
                        int updatedRecordCount = this.userRepository.updatePasswordForUserWithUserId(requestPassword, userId);
                        if (updatedRecordCount > 0) {
                            return ResponseHandler.generateResponse("Password updated successfully!!", HttpStatus.OK, null);
                        } else {
                            return ResponseHandler.generateResponse("password update failed!!", HttpStatus.INTERNAL_SERVER_ERROR, null);
                        }
                    } else {
                        return ResponseHandler.generateResponse("please provide valid old password!!", HttpStatus.NOT_ACCEPTABLE, null);
                    }
                } else {
                    return ResponseHandler.generateResponse("newPassword and Confirm Password not matching!!", HttpStatus.NOT_ACCEPTABLE, null);
                }
            }
            return ResponseHandler.generateResponse("user with userId : " + userId + " not found!!", HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            logger.info("Exception occurred in the function resetUserPassword : " + e.getMessage());
            return ResponseHandler.generateResponse("Exception : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    public boolean isUserPresentById(String userId){
        return this.userRepository.findById(userId).isPresent();
    }

    public String getUsername(String userId){
        return this.userRepository.findById(userId).get().getUsername();
    }

    public Integer getUserCntByRoleAndClassroomId(String classroomId, String roleName){
        return this.userRepository.findUserCntForClassroomWithRole(classroomId, roleName.toLowerCase());
    }
}
