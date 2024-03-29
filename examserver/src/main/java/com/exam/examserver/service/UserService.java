package com.exam.examserver.service;

import com.exam.examserver.dto.ResetPasswordDTO;
import com.exam.examserver.entity.User;
import com.exam.examserver.entity.UserRole;
import org.springframework.http.ResponseEntity;

import java.util.Set;

public interface UserService {

    // creating User
    ResponseEntity<?> createUser(User user, Set<UserRole> userRoles) throws Exception;

    // get User by username
    User getUserByUsername(String username);

    // delete User by id
    void deleteUser(String userId);


    // enable / disable user status
    ResponseEntity<?> updateUserStatus(String userId, Boolean status);

    ResponseEntity<?> getUserById(String userId);

    ResponseEntity<?> updateUserById(String userId, User user);

    ResponseEntity<?> getUserByOrgId(String orgId, String roleName);

    ResponseEntity<?> resetUserPassword(String userId, ResetPasswordDTO resetPasswordDTO);
}
