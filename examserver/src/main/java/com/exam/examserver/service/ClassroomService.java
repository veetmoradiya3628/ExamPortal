package com.exam.examserver.service;

import com.exam.examserver.dto.ClassroomDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ClassroomService {
    List<ClassroomDTO> getAllClassrooms();
    List<ClassroomDTO> getClassroomsForOrganization(String orgId);

    ClassroomDTO createClassroom(ClassroomDTO classroomDTO);

    ResponseEntity<?> deleteClassroom(String classId);

    ResponseEntity<?> getClassroomDetailsById(String classroomId);
}
