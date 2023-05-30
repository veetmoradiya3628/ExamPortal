package com.exam.examserver.controller;

import com.exam.examserver.entity.Organization;
import com.exam.examserver.service.OrganizationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/organization")
@CrossOrigin("*")
public class OrganizationController {

    final String LOG_TAG = "ORGANIZATION_CONTROLLER";
    Logger logger = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    private OrganizationService organizationService;

    /*
      * Method to add Organization data into database
     */
    @PostMapping("/")
    public ResponseEntity<?> addOrganization(@RequestBody Organization organization){
        logger.info(LOG_TAG + " inside addOrganization, data to be added : "+organization.toString());
        return this.organizationService.addOrganization(organization);
    }

    /*
      * Method to get Organization data
     */
    @GetMapping("/")
    public ResponseEntity<List<Organization>> getOrganizations(){
        logger.info(LOG_TAG + " inside get all organization details method");
        return this.organizationService.getOrganizations();
    }

    /*
    * Method to get Organization By Id
     */
    @GetMapping("/{orgId}")
    public ResponseEntity<Organization> getOrgById(@PathVariable("orgId") String orgId){
        return this.organizationService.getOrganization(orgId);
    }

    /*
    * Method to update Organization By Id
     */
    @PutMapping("/{orgId}")
    public ResponseEntity<Organization> updateOrganizationDetails(@PathVariable("orgId") String orgId,@RequestBody Organization organization){
        return this.organizationService.updateOrganization(orgId, organization);
    }

    /*
     * Method to delete Organization By Id
     */
    @DeleteMapping("/{orgId}")
    public ResponseEntity<HttpStatus> deleteOrganization(@PathVariable("orgId") String orgId){
        return this.organizationService.deleteOrganization(orgId);
    }
}