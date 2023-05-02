package com.exam.examserver;

import com.exam.examserver.entity.Role;
import com.exam.examserver.entity.User;
import com.exam.examserver.entity.UserRole;
import com.exam.examserver.repo.UserRepository;
import com.exam.examserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Starting code ....");

		User user = new User();
		user.setFirstName("Veet");
		user.setLastName("Moradiya");
		user.setUsername("vmcoder");
		user.setPassword(this.bCryptPasswordEncoder.encode("123456"));
		user.setEmail("vmcoder@gmail.com");
		user.setProfile("default.png");

		Role role1 = new Role();
		role1.setRoleId(1L);
		role1.setRole("ADMIN");


		Set<UserRole> userRoleSet = new HashSet<>();
		UserRole userRole = new UserRole();
		userRole.setRole(role1);
		userRole.setUser(user);
		userRoleSet.add(userRole);

		if(userRepository.existsByUsername("vmcoder")){
			System.out.println("User with username "+user.getUsername()+"Exists and data for the same is : "+user.toString());
		}else{
			System.out.println("User with username "+user.getUsername()+" Not exists");
			User user1 = this.userService.createUser(user, userRoleSet);
			System.out.println(user1.getUsername());
		}
	}
}
