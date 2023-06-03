package com.exam.examserver.service;

import com.exam.examserver.entity.Role;
import org.springframework.http.ResponseEntity;

public interface RoleService {
    public ResponseEntity<?> addRole(Role role);

}
