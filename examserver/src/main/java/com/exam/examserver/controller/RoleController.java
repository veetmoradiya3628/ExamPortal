package com.exam.examserver.controller;

import com.exam.examserver.entity.Role;
import com.exam.examserver.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/role")
public class RoleController {

    final String LOG_TAG = "ROLE_CONTROLLER";
    Logger logger = LoggerFactory.getLogger(OrganizationController.class);

    @Autowired
    private RoleService roleService;

    @PostMapping("/")
    public ResponseEntity<?> createRole(@RequestBody Role role){
        logger.info(LOG_TAG + " inside addOrganization, data to be added : "+role.toString());
        return this.roleService.addRole(role);
    }
}
