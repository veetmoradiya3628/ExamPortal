package com.exam.examserver.controller;

import com.exam.examserver.dto.ClassroomDTO;
import com.exam.examserver.dto.ClassroomUserDTO;
import com.exam.examserver.service.impl.ClassroomServiceImpl;
import com.exam.examserver.service.impl.ClassroomUserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/classroom/")
@CrossOrigin("*")
public class ClassroomController {

    final String LOG_TAG = "CLASSROOM_CONTROLLER";
    Logger logger = LoggerFactory.getLogger(ClassroomController.class);

    @Autowired
    private ClassroomServiceImpl classroomService;

    @Autowired
    private ClassroomUserServiceImpl classroomUserService;

    /*
     * Request to get all classroom details
     */
    @GetMapping("/")
    public ResponseEntity<?> getAllClasses(){
        return ResponseEntity.ok(classroomService.getAllClassrooms());
    }

    /*
     * Request to get classroom belong to Organization
     */
    @GetMapping("/{orgId}")
    public ResponseEntity<?> getClassesForOrganization(@PathVariable("orgId") String orgId){
        return ResponseEntity.ok(classroomService.getClassroomsForOrganization(orgId));
    }

    /*
     * Request to create classroom
     */
    @PostMapping("/")
    public ResponseEntity<?> createClassroom(@RequestBody ClassroomDTO classroomDTO){
        return ResponseEntity.ok(classroomService.createClassroom(classroomDTO));
    }

    /*
     * Update classroom - Not supported for Now
     */

    /*
     * GET - get class by ID
     */
    @GetMapping("/classDetailsById/{classroomId}")
    public ResponseEntity<?> getClassroomDetailsById(@PathVariable("classroomId") String classroomId)
    {
        return ResponseEntity.ok(classroomService.getClassroomDetailsById(classroomId));
    }

    /*
     * Delete classroom
     */
    @DeleteMapping("/{classId}")
    public ResponseEntity<?> deleteClassroom(@PathVariable("classId") String classId){
        return ResponseEntity.ok(classroomService.deleteClassroom(classId));
    }

    /*
     * url to get all the user mapping for all classroom
     */
    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsersOfClassroom(){
        return this.classroomUserService.getAllClassroomUserEntry();
    }

    /*
     * Map User to Classroom
     */
    @PostMapping("/addUserToClassroom")
    public ResponseEntity<?> mapUserWithClassroom(@RequestBody ClassroomUserDTO classroomUserDTO){
        return this.classroomUserService.addUserToClassroom(classroomUserDTO);
    }

    /*
     * Get User Mapped to Classroom with Role
     */
    @GetMapping("{classroomId}/users")
    public ResponseEntity<?> getUsersByRoles(@PathVariable("classroomId") String classroomId, @RequestParam(required = false) String role){
        return this.classroomUserService.getUserOfClassroomByRole(classroomId, role);
    }

    /*
     * Get User not mapped to Classroom with Role
     */
    @GetMapping("{classroomId}/notMappedUsers")
    public ResponseEntity<?> getUsersNotMappedToClassroom(@PathVariable("classroomId") String classroomId, @RequestParam(required = false) String role){
        return this.classroomUserService.getUsersNotMappedToClassroomByRole(classroomId, role);
    }

    /*
     * Delete User mapping from classroom
     */
    @DeleteMapping("{classroomId}/user/{userId}")
    public ResponseEntity<?> deleteUserMappingFromClassroom(@PathVariable("classroomId") String classroomId,
                                                            @PathVariable("userId") String userId){
        System.out.println("--> "+classroomId+" --> "+userId);
        return this.classroomUserService.deleteUserMappingFromClassroom(classroomId, userId);
    }

}
