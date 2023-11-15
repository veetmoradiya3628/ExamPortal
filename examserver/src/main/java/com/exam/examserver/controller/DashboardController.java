package com.exam.examserver.controller;

import com.exam.examserver.service.impl.CommentsServiceImpl;
import com.exam.examserver.service.impl.DashboardServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard/")
@CrossOrigin("*")
public class DashboardController {
    final String LOG_TAG = "DASHBOARD_CONTROLLER";
    Logger logger = LoggerFactory.getLogger(DashboardController.class);

    @Autowired
    private DashboardServiceImpl dashboardService;

    @GetMapping("admin")
    public ResponseEntity<?> getAdminDashboardStats(){
        logger.info(LOG_TAG + " controller method called : getAdminDashboardStats");
        return this.dashboardService.getAdminDashboardStats();
    }
}
