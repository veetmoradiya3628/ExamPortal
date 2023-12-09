package com.exam.examserver;

import com.exam.examserver.entity.Organization;
import com.exam.examserver.entity.Role;
import com.exam.examserver.entity.User;
import com.exam.examserver.entity.UserRole;
import com.exam.examserver.repo.OrganizationRepository;
import com.exam.examserver.repo.RoleRepository;
import com.exam.examserver.repo.UserRepository;
import com.exam.examserver.service.OrganizationService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.*;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	@Bean
	public ModelMapper getModelMapper(){
		return new ModelMapper();
	}

	final String GLOBAL_ORG_NAME = "Test University";
	final List<String> roles = new ArrayList<>(Arrays.asList("MASTER_ADMIN","ORG_ADMIN","TEACHER","STUDENT"));

	Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private OrganizationService organizationService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private OrganizationRepository organizationRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		logger.info("Starting server startup code execution....");
		addOrganization();
		addRoles();
        addInitialMasterAdmin();
		logger.info("Completed server startup code execution....");
	}

    private void addInitialMasterAdmin() {
		if(this.userRepository.existsByUsername("masteradmin")){
			logger.info("master admin already exists, no need to add again :)!!");
		}else {
			logger.info("started adding master admin...");
			User user = new User();
			Organization org = this.organizationRepository.findByOrgName(this.GLOBAL_ORG_NAME);

			user.setOrganization(org);
			user.setEmail("masteradmin@gmail.com");
			user.setUsername("masteradmin");
			user.setEnabled(true);
			user.setFirstName("master admin fn");
			user.setLastName("master admin ln");
			user.setPhone("9824339295");
			user.setProfileImage("default.png");

			// encoding password with BCrypt
			user.setPassword(this.bCryptPasswordEncoder.encode("masteradmin@1234"));

			Set<UserRole> roles = new HashSet<>();
			Role role = this.roleRepository.findByRoleName("MASTER_ADMIN");
			UserRole userRole = new UserRole();
			userRole.setUser(user);
			userRole.setRole(role);
			roles.add(userRole);
			user.setUserRoles(roles);

			User u = this.userRepository.save(user);
			logger.info("completed adding master admin...");
		}
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
			this.organizationService.addOrganization(organization);
			logger.info("Organization addition completed...");
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
