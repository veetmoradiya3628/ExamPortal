package com.exam.examserver;

import com.exam.examserver.entity.Organization;
import com.exam.examserver.entity.Role;
import com.exam.examserver.entity.User;
import com.exam.examserver.entity.UserRole;
import com.exam.examserver.repo.OrganizationRepository;
import com.exam.examserver.repo.UserRepository;
import com.exam.examserver.service.OrganizationService;
import com.exam.examserver.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	final String GLOBAL_ORG_NAME = "Test University";

	Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private OrganizationService organizationService;

	@Autowired
	private OrganizationRepository organizationRepository;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Starting code ....");
		addOrganization();
	}

	private void addOrganization(){
		Organization organization = new Organization();
		organization.setOrgName(GLOBAL_ORG_NAME);
		organization.setOrgDescription("Test Organization");
		if(this.organizationRepository.existsByOrgName(organization.getOrgName())){
			logger.info("Organization exists with orgName -> "+organization.getOrgName());
		}else{
			logger.info("Organization does not exists with orgName -> "+organization.getOrgName());
			Organization organization1 = this.organizationService.addOrganization(organization);
			System.out.println("Added the organization -> "+organization1);
		}
	}

}
