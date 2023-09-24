package com.exam.examserver.service;

import com.exam.examserver.dto.ClassroomUserDTO;
import org.springframework.http.ResponseEntity;

public interface ClassroomUserService {
    public ResponseEntity<?> addUserToClassroom(ClassroomUserDTO classroomUserDTO);

    ResponseEntity<?> getUserOfClassroomByRole(String classroomId, String role);

    ResponseEntity<?> deleteUserMappingFromClassroom(String classroomId, String userId);

    ResponseEntity<?> getClassroomsByUserId(String userId);

    ResponseEntity<?> getUsersNotMappedToClassroomByRole(String classroomId, String role);
}
