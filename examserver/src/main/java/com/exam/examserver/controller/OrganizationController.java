package com.exam.examserver.controller;

import com.exam.examserver.entity.Organization;
import com.exam.examserver.service.OrganizationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Organization> addOrganization(@RequestBody Organization organization){
        logger.info(LOG_TAG + " inside addOrganization, data to be added : "+organization.toString());
        Organization addedOrganization = this.organizationService.addOrganization(organization);
        return ResponseEntity.ok(addedOrganization);
    }

    /*
      * Method to get Organization data
     */
    @GetMapping("/")
    public ResponseEntity<?> getOrganizations(){
        logger.info(LOG_TAG + " inside get all organization details method");
        return ResponseEntity.ok(this.organizationService.getOrganizations());
    }

    /*
    * Method to get Organization By Id
     */
    @GetMapping("/{orgId}")
    public ResponseEntity<Organization> findOrgById(@PathVariable("orgId") String orgId){
        return ResponseEntity.ok(this.organizationService.getOrganization(orgId));
    }

    /*
    * Method to update Organization By Id
     */
    @PutMapping("/")
    public Organization updateOrganizationDetails(Organization organization){
        return this.organizationService.updateOrganization(organization);
    }

    /*
     * Method to delete Organization By Id
     */
    @DeleteMapping("/{orgId}")
    public void deleteOrganization(@PathVariable("orgId") String orgId){
        this.organizationService.deleteOrganization(orgId);
    }
}
