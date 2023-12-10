package com.exam.examserver.service;

import org.springframework.http.ResponseEntity;

public interface DashboardService {
    public ResponseEntity<?> getAdminDashboardStats();
}
