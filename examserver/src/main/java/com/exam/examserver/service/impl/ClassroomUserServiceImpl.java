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
import com.exam.examserver.repo.OrganizationRepository;
import com.exam.examserver.repo.UserRepository;
import com.exam.examserver.service.ClassroomUserService;
import com.exam.examserver.service.QuizService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class ClassroomUserServiceImpl implements ClassroomUserService {

    Logger logger = LoggerFactory.getLogger(ClassroomUserServiceImpl.class);

    @Autowired
    private ClassroomUserRepository classroomUserRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private QuizServiceImpl quizService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private UserServiceImpl userService;

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
    public ResponseEntity<?> getUsersNotMappedToClassroomByRole(String classroomId, String role) {
        try{
            Optional<Classroom> isClassroomPresent = this.classroomRepository.findById(classroomId);
            if (isClassroomPresent.isEmpty()) {
                return ResponseHandler.generateResponse("Classroom with classroomID" + classroomId + " not exists!", HttpStatus.NOT_FOUND, null);
            } else {
                    List<User> listOfUsers = this.classroomUserRepository.findNotMappedUserToClassroomWithRole(classroomId, role);
                    logger.info("listOfUsers : " + listOfUsers.size());
                    List<UserDTO> responseUser = new ArrayList<>();
                    listOfUsers.forEach(user -> {
                        responseUser.add(this.modelMapper.map(this.userRepository.findById(user.getUserId()), UserDTO.class));
                    });
                    return ResponseHandler.generateResponse("ok", HttpStatus.OK, responseUser);
            }
        }catch (Exception e){
            System.out.println("Exception : " + Arrays.toString(e.getStackTrace()));
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
                        Integer quizCnt = this.quizService.getQuizCntForClassroom(data.getClassroom().getClassroomId());
                        Integer teacherCnt = this.userService.getUserCntByRoleAndClassroomId(data.getClassroom().getClassroomId(), "teacher");
                        Integer studentCnt = this.userService.getUserCntByRoleAndClassroomId(data.getClassroom().getClassroomId(), "student");
                        logger.info("quizCnt : " + quizCnt + "teacherCnt : " + teacherCnt + " studentCnt : " + studentCnt);
                        ClassroomDTO c = this.modelMapper.map(data.getClassroom(), ClassroomDTO.class);
                        c.setQuizCnt(quizCnt);
                        c.setTeacherCnt(teacherCnt);
                        c.setStudentCnt(studentCnt);
                        classrooms.add(c);
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
