package com.exam.examserver.service;

import com.exam.examserver.entity.User;
import com.exam.examserver.entity.UserRole;

import java.util.Set;

public interface UserService {

    // creating User
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    // get User by username
    public User getUser(String username);

    // delete User by id
    public void deleteUser(Long userId);
}
