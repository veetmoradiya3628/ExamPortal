package com.exam.examserver.service;

import com.exam.examserver.entity.Category;
import com.exam.examserver.entity.Organization;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface OrganizationService {
    public ResponseEntity<?> addOrganization(Organization organization);
    public ResponseEntity<Organization> updateOrganization(String orgId, Organization organization);
    public ResponseEntity<List<Organization>> getOrganizations();
    public ResponseEntity<Organization> getOrganization(String orgId);
    public ResponseEntity<HttpStatus> deleteOrganization(String orgId);
}
