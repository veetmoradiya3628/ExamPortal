package com.exam.examserver.service.impl;

import com.exam.examserver.entity.Organization;
import com.exam.examserver.repo.OrganizationRepository;
import com.exam.examserver.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Override
    public ResponseEntity<?> addOrganization(Organization organization) {
        try{
            if(this.organizationRepository.existsByOrgName(organization.getOrgName())){
                Map<String, String> mpp = new HashMap<>();
                mpp.put("message", "Organization already exists with username "+organization.getOrgName());
                return new ResponseEntity<>(mpp, HttpStatus.CONFLICT);
            }else{
                Organization _organization = this.organizationRepository.save(new Organization(organization.getOrgName(), organization.getOrgDescription()));
                return new ResponseEntity<>(_organization, HttpStatus.CREATED);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Organization> updateOrganization(String orgId, Organization organization) {
        Optional<Organization> organizationData = this.organizationRepository.findById(orgId);
        if (organizationData.isPresent()){
            Organization _organization = organizationData.get();
            _organization.setOrgName(organization.getOrgName());
            _organization.setOrgDescription(organization.getOrgDescription());
            return new ResponseEntity<>(this.organizationRepository.save(_organization), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<List<Organization>> getOrganizations() {
        try{
            List<Organization> organizations = new ArrayList<>(this.organizationRepository.findAll());
            if(organizations.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(organizations, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Organization> getOrganization(String orgId) {
        Optional<Organization> organizationData = this.organizationRepository.findById(orgId);
        return organizationData.map(organization -> new ResponseEntity<>(organization, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<HttpStatus> deleteOrganization(String orgId) {
       try{
           this.organizationRepository.deleteById(orgId);
           return new ResponseEntity<>(HttpStatus.NO_CONTENT);
       }catch (Exception e){
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
}
