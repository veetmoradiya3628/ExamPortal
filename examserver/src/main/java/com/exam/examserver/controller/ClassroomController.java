package com.exam.examserver.controller;

import com.exam.examserver.dto.ClassroomDTO;
import com.exam.examserver.service.impl.ClassroomServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/classroom/")
@CrossOrigin("*")
public class ClassroomController {

    final String LOG_TAG = "CLASSROOM_CONTROLLER";
    Logger logger = LoggerFactory.getLogger(ClassroomController.class);

    @Autowired
    private ClassroomServiceImpl classroomService;

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
}
