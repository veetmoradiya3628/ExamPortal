package com.exam.examserver.service.impl;

import com.exam.examserver.entity.Organization;
import com.exam.examserver.repo.OrganizationRepository;
import com.exam.examserver.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Override
    public Organization addOrganization(Organization organization) {
        return this.organizationRepository.save(organization);
    }

    @Override
    public Organization updateOrganization(Organization organization) {
//        this.organizationRepository.findById(organization.getOrgId()).ifPresent(organization1 -> {
//            organization1.setOrgName(organization.getOrgName());
//            organization1.setOrgDescription(organization.getOrgDescription());
//            this.organizationRepository.save(organization1);
//        });
        if(organizationRepository.existsById(organization.getOrgId())){
            Organization org = this.organizationRepository.findById(organization.getOrgId()).get();
            org.setOrgName(organization.getOrgName());
            org.setOrgDescription(organization.getOrgDescription());
        }
        return this.organizationRepository.save(organization);
    }

    @Override
    public Set<Organization> getOrganizations() {
        return new LinkedHashSet<>(this.organizationRepository.findAll());
    }

    @Override
    public Organization getOrganization(String orgId) {
        return this.organizationRepository.findById(orgId).get();
    }

    @Override
    public void deleteOrganization(String orgId) {
        Organization organization = new Organization();
        organization.setOrgId(orgId);
        this.organizationRepository.delete(organization);
    }
}
