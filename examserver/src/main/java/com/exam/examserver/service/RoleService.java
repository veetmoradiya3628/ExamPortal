package com.exam.examserver.service;

import com.exam.examserver.entity.Role;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RoleService {
    public ResponseEntity<?> addRole(Role role);

    public ResponseEntity<List<Role>> getAllRoles();
}
