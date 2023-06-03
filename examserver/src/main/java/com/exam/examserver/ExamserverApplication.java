package com.exam.examserver;

import com.exam.examserver.entity.Organization;
import com.exam.examserver.entity.Role;
import com.exam.examserver.repo.OrganizationRepository;
import com.exam.examserver.repo.RoleRepository;
import com.exam.examserver.service.OrganizationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	final String GLOBAL_ORG_NAME = "Test University";
	final List<String> roles = new ArrayList<>(Arrays.asList("MASTER_ADMIN","ORG_ADMIN","TEACHER","STUDENT"));


	Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private OrganizationService organizationService;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private OrganizationRepository organizationRepository;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Starting code....");
		addOrganization();
		addRoles();
	}

	private void addOrganization(){
		logger.info("Add Organization Started...");
		Organization organization = new Organization();
		organization.setOrgName(GLOBAL_ORG_NAME);
		organization.setOrgDescription("Test Organization");
		if(this.organizationRepository.existsByOrgName(organization.getOrgName())){
			logger.info("Organization exists with orgName -> "+organization.getOrgName());
		}else{
			logger.info("Organization does not exists with orgName -> "+organization.getOrgName());
			logger.info((String) this.organizationService.addOrganization(organization).getBody());
		}
		logger.info("Add Organization ended...");
	}

	private void addRoles(){
		logger.info("roles addition started ...");
		for (String role: roles){
			if(!this.roleRepository.existsByRoleName(role)){
				logger.info("role with roleName "+role+" is not exists");
				Role _role = new Role();
				_role.setRoleName(role);
				Role _addedRole = this.roleRepository.save(_role);
				logger.info("Added new role with details "+_addedRole.toString());
			}
		}
		logger.info("roles addition ended ...");
	}
}
