package com.exam.examserver.service.impl;

import com.exam.examserver.helper.ResponseHandler;
import com.exam.examserver.repo.OrganizationRepository;
import com.exam.examserver.repo.UserRepository;
import com.exam.examserver.service.DashboardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    Logger logger = LoggerFactory.getLogger(DashboardServiceImpl.class);

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> getAdminDashboardStats() {
        logger.info("Organization count : " + organizationRepository.getOrganizationCount());
//        logger.info("Active Teacher User Count : "+ userRepository.findAllUsersByRoleNameAndStatus("teacher", true));
//        logger.info("In-Active Teacher User Count : "+ userRepository.findAllUsersByRoleNameAndStatus("teacher", false));
//        logger.info("Active Student User Count : "+ userRepository.findAllUsersByRoleNameAndStatus("student", true));
//        logger.info("In-Active Student User Count : "+ userRepository.findAllUsersByRoleNameAndStatus("student", false));
        return ResponseHandler.generateResponse("", HttpStatus.OK, "This is migrated API to flask API");
    }
}
