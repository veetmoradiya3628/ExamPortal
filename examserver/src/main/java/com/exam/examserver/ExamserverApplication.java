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

	/*
	private void addUserDummyData(){
		System.out.println("Adding dummy data into tbl_user");
		String orgId = "a77f5d7b-c50d-418d-8c66-3814049ca386";
		String firstName = "Veet" + orgId.substring(0, 8);
		String lastName = "Moradiya" + orgId.substring(0, 8);
		String mobileNo = "9824339295";
		String profileName = "default.png";

		for (int cnt = 11; cnt <= 20; cnt++) {
			User user = new User();
			user.setEnabled(true);
			user.setPassword(this.bCryptPasswordEncoder.encode("Veet@1234"));
			user.setPhone(mobileNo);
			user.setUsername(firstName + "_" + cnt + "_" + lastName);
			user.setFirstName(firstName);
			user.setLastName(lastName);
			user.setEmail(firstName + lastName + cnt + "@gmail.com");
			user.setProfileImage(profileName);
			user.setOrganization(this.organizationRepository.findById(orgId).get());
			// role
			Set<UserRole> roles = new HashSet<>();
			Role role = this.roleRepository.findByRoleName("STUDENT");
			UserRole userRole = new UserRole();
			userRole.setUser(user);
			userRole.setRole(role);
			roles.add(userRole);

			user.getUserRoles().addAll(roles);
			System.out.println("Adding user --> "+user.toString());
			this.userRepository.save(user);
		}
	} */
}
