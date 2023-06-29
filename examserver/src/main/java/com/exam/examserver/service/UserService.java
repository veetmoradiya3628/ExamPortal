package com.exam.examserver.service;

import com.exam.examserver.entity.User;
import com.exam.examserver.entity.UserRole;
import org.springframework.http.ResponseEntity;

import java.util.Set;

public interface UserService {

    // creating User
    User createUser(User user, Set<UserRole> userRoles) throws Exception;

    // get User by username
    User getUser(String username);

    // delete User by id
    void deleteUser(String userId);


    // enable / disable user status
    ResponseEntity<?> updateUserStatus(String userId, Boolean status);
}
