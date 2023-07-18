package com.exam.examserver.service.impl;

import com.exam.examserver.dto.ClassroomUserDTO;
import com.exam.examserver.dto.PostsDTO;
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

import java.util.List;
import java.util.Optional;

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
        try{
            System.out.println("Received classroom DTO" + classroomUserDTO.toString());
            Optional<User> isUserPresent = this.userRepository.findById(classroomUserDTO.getUserId());
            if (isUserPresent.isPresent()){
                Optional<Classroom> isClassroomPresent = this.classroomRepository.findById(classroomUserDTO.getClassroomId());
                if (isClassroomPresent.isPresent()){
                    if (this.classroomUserRepository.findByClassroomAndUser(new Classroom(classroomUserDTO.getClassroomId()), new User(classroomUserDTO.getUserId())).size() >= 1){
                        return ResponseHandler.generateResponse("User mapping with Classroom already exists!!", HttpStatus.ALREADY_REPORTED, null);
                    }
                    ClassroomUser classroomUser = this.modelMapper.map(classroomUserDTO, ClassroomUser.class);
                    classroomUser = this.classroomUserRepository.save(classroomUser);
                    classroomUserDTO.setClassroomUserId(classroomUser.getClassroomUserId());
                    return ResponseHandler.generateResponse("User mapping with Classroom occurred!!", HttpStatus.OK, classroomUserDTO);
                }else{
                    return ResponseHandler.generateResponse("Classroom with classroomID" + classroomUserDTO.getClassroomId() + " not exists!", HttpStatus.NOT_FOUND, null);
                }
            }
            return ResponseHandler.generateResponse("User with userID" + classroomUserDTO.getUserId() + " not exists!", HttpStatus.NOT_FOUND, null);
        }catch (Exception e){
            return ResponseHandler.generateResponse("Exception occurred"+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
}
