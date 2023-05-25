package com.exam.examserver.service;

import com.exam.examserver.entity.Category;
import com.exam.examserver.entity.Organization;

import java.util.Set;

public interface OrganizationService {
    public Organization addOrganization(Organization organization);
    public Organization updateOrganization(Organization organization);
    public Set<Organization> getOrganizations();
    public Organization getOrganization(String orgId);
    public void deleteOrganization(String orgId);
}
