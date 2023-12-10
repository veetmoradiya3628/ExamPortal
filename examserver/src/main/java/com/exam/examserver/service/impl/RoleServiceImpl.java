package com.exam.examserver.service.impl;

import com.exam.examserver.entity.Role;
import com.exam.examserver.repo.RoleRepository;
import com.exam.examserver.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.reflect.Executable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RoleServiceImpl implements RoleService {

    Logger logger = LoggerFactory.getLogger(RoleServiceImpl.class);

    @Autowired
    private RoleRepository roleRepository;
    @Override
    public ResponseEntity<?> addRole(Role role) {
        try{
            if(this.roleRepository.existsByRoleName(role.getRoleName())){
                Map<String, String> mpp = new HashMap<>();
                mpp.put("message", role.getRoleName()+" already exists!");
                return new ResponseEntity<>(mpp, HttpStatus.CONFLICT);
            }else{
                Role _role = this.roleRepository.save(new Role(role.getRoleName()));
                return new ResponseEntity<>(_role, HttpStatus.CREATED);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<Role>> getAllRoles() {
        try{
            List<Role> roles = this.roleRepository.findAll();
            logger.info("data at role service is "+roles);
            return new ResponseEntity<>(roles, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
