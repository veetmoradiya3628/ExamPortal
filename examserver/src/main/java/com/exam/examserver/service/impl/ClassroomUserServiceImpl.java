package com.exam.examserver.service.impl;

import com.exam.examserver.dto.ClassroomDTO;
import com.exam.examserver.dto.ClassroomUserDTO;
import com.exam.examserver.dto.UserDTO;
import com.exam.examserver.entity.Classroom;
import com.exam.examserver.entity.ClassroomUser;
import com.exam.examserver.entity.User;
import com.exam.examserver.helper.ResponseHandler;
import com.exam.examserver.repo.ClassroomRepository;
import com.exam.examserver.repo.ClassroomUserRepository;
import com.exam.examserver.repo.UserRepository;
import com.exam.examserver.service.ClassroomUserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class ClassroomUserServiceImpl implements ClassroomUserService {

    @Autowired
    private ClassroomUserRepository classroomUserRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassroomRepository classroomRepository;

    public ResponseEntity<?> getAllClassroomUserEntry(){
        List<ClassroomUser> usersOfClassroom = this.classroomUserRepository.findAll();
        System.out.println("size : "+usersOfClassroom.size());
        usersOfClassroom.forEach(System.out::println);
        return ResponseEntity.ok(usersOfClassroom);
    }

    @Override
    public ResponseEntity<?> addUserToClassroom(ClassroomUserDTO classroomUserDTO) {
        try {
            System.out.println("Received classroom DTO" + classroomUserDTO.toString());
            Optional<User> isUserPresent = this.userRepository.findById(classroomUserDTO.getUserId());
            if (isUserPresent.isPresent()) {
                Optional<Classroom> isClassroomPresent = this.classroomRepository.findById(classroomUserDTO.getClassroomId());
                if (isClassroomPresent.isPresent()) {
                    if (this.classroomUserRepository.findByClassroomAndUser(new Classroom(classroomUserDTO.getClassroomId()), new User(classroomUserDTO.getUserId())).size() >= 1) {
                        return ResponseHandler.generateResponse("User mapping with Classroom already exists!!", HttpStatus.ALREADY_REPORTED, null);
                    }
                    ClassroomUser classroomUser = this.modelMapper.map(classroomUserDTO, ClassroomUser.class);
                    classroomUser = this.classroomUserRepository.save(classroomUser);
                    classroomUserDTO.setClassroomUserId(classroomUser.getClassroomUserId());
                    return ResponseHandler.generateResponse("User mapping with Classroom occurred!!", HttpStatus.OK, classroomUserDTO);
                } else {
                    return ResponseHandler.generateResponse("Classroom with classroomID" + classroomUserDTO.getClassroomId() + " not exists!", HttpStatus.NOT_FOUND, null);
                }
            }
            return ResponseHandler.generateResponse("User with userID" + classroomUserDTO.getUserId() + " not exists!", HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            System.out.println(Arrays.toString(e.getStackTrace()));
            return ResponseHandler.generateResponse("Exception occurred" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Override
    public ResponseEntity<?> getUserOfClassroomByRole(String classroomId, String role) {
        try {
            Optional<Classroom> isClassroomPresent = this.classroomRepository.findById(classroomId);
            if (isClassroomPresent.isEmpty()) {
                return ResponseHandler.generateResponse("Classroom with classroomID" + classroomId + " not exists!", HttpStatus.NOT_FOUND, null);
            } else {
                List<ClassroomUser> classroomUsers = this.classroomUserRepository.findByClassroom(new Classroom(classroomId));
                List<UserDTO> responseUsers = new ArrayList<>();
                classroomUsers.forEach(classroomUser -> {
                    System.out.println(classroomUser.getClassroom().getClassroomId());
                    AtomicBoolean role_match = new AtomicBoolean(false);
                    classroomUser.getUser().getUserRoles().forEach(r -> {
                        if (r.getRole().getRoleName().equalsIgnoreCase(role)){
                            role_match.set(true);
                        }
                    });
                    if (role_match.get()){
                        UserDTO rspUser = this.modelMapper.map(classroomUser.getUser(), UserDTO.class);
                        responseUsers.add(rspUser);
                    }
                });
                return ResponseHandler.generateResponse("", HttpStatus.OK, responseUsers);
            }
        } catch (Exception e) {
            System.out.println(Arrays.toString(e.getStackTrace()));
            return ResponseHandler.generateResponse("Exception occurred" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Override
    public ResponseEntity<?> deleteUserMappingFromClassroom(String classroomId, String userId) {
        try {
            if (this.classroomUserRepository.findByClassroomAndUser(new Classroom(classroomId),new User(userId)).size() >= 1) {
                System.out.println("User mapping with Classroom exists!!");
                Long cnt = this.classroomUserRepository.deleteByClassroomAndUser(new Classroom(classroomId), new User(userId));
                System.out.println("---> "+cnt);
                return ResponseHandler.generateResponse("User mapping with Classroom deleted successfully!!", HttpStatus.OK, null);
            }
            return ResponseHandler.generateResponse("User mapping with Classroom not exists!!", HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            System.out.println(Arrays.toString(e.getStackTrace()));
            return ResponseHandler.generateResponse("Exception occurred" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Override
    public ResponseEntity<?> getClassroomsByUserId(String userId) {
        try {
            if (this.userRepository.findById(userId).isPresent()){
                List<ClassroomUser> listOfClassrooms = this.classroomUserRepository.findByUser(new User(userId));
                if (listOfClassrooms.size() > 0){
                    List<ClassroomDTO> classrooms = new ArrayList<>();
                    listOfClassrooms.forEach(data -> {
                        classrooms.add(this.modelMapper.map(data.getClassroom(), ClassroomDTO.class));
                    });
                    return ResponseHandler.generateResponse("Classrooms for User with userId -> "+userId, HttpStatus.OK, classrooms);
                }else{
                    return ResponseHandler.generateResponse("No classrooms for User with userId -> "+userId, HttpStatus.OK, null);
                }
            }else{
                return ResponseHandler.generateResponse("User with userID" + userId + " not exists!", HttpStatus.NOT_FOUND, null);
            }
        } catch (Exception e) {
            System.out.println(Arrays.toString(e.getStackTrace()));
            return ResponseHandler.generateResponse("Exception occurred" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
}
