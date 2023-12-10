package com.exam.examserver.controller;

import com.exam.examserver.entity.Role;
import com.exam.examserver.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/role")
public class RoleController {

    final String LOG_TAG = "ROLE_CONTROLLER";
    Logger logger = LoggerFactory.getLogger(OrganizationController.class);

    @Autowired
    private RoleService roleService;

//    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
//    @PreAuthorize("hasRole('STUDENT')")
//    @PreAuthorize("hasAnyRole('STUDENT', 'ORG_ADMIN')")
    @PostMapping("/")
    public ResponseEntity<?> createRole(@RequestBody Role role){
        logger.info(LOG_TAG + " inside addOrganization, data to be added : "+role.toString());
        return this.roleService.addRole(role);
    }

    @GetMapping("/")
    public ResponseEntity<List<Role>> getAllRole(){
        ResponseEntity<List<Role>> response = this.roleService.getAllRoles();
        logger.info(LOG_TAG + " inside getAllRole, data we will return is");
        return response;
    }
}
