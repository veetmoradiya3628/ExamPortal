package com.exam.examserver.controller;

import com.exam.examserver.entity.Role;
import com.exam.examserver.repo.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/")
    public ResponseEntity<Role> createRole(@RequestBody Role role){
        return ResponseEntity.ok(roleRepository.save(role));
    }
}
