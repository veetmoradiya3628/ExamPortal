package com.exam.examserver.service.impl;

import com.exam.examserver.dto.ClassroomDTO;
import com.exam.examserver.entity.Classroom;
import com.exam.examserver.entity.Organization;
import com.exam.examserver.repo.ClassroomRepository;
import com.exam.examserver.service.ClassroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClassroomServiceImpl implements ClassroomService {

    @Autowired
    private ClassroomRepository classroomRepository;

    /*
     * Method to get all classrooms
     */
    @Override
    public List<ClassroomDTO> getAllClassrooms() {
        List<Classroom> classrooms = classroomRepository.findAll();
        List<ClassroomDTO> classroomDTOs = new ArrayList<>();
        classrooms.forEach(classroom -> {
            ClassroomDTO classroomDTO = new ClassroomDTO(
                    classroom.getClassroomId(),
                    classroom.getClassroomTitle(),
                    classroom.getClassroomSubTitle(),
                    classroom.getClassroomCode(),
                    classroom.getOrganization().getOrgId(),
                    classroom.getCreatedAt()
            );
            classroomDTOs.add(classroomDTO);
        });
        return classroomDTOs;
    }


    /*
     * Method to get classroom belong to organization
     */
    public List<ClassroomDTO> getClassroomsForOrganization(String orgId) {
        List<Classroom> classrooms = classroomRepository.findByOrganization(new Organization(orgId));
        List<ClassroomDTO> classroomDTOs = new ArrayList<>();
        classrooms.forEach(classroom -> {
            ClassroomDTO classroomDTO = new ClassroomDTO(
                    classroom.getClassroomId(),
                    classroom.getClassroomTitle(),
                    classroom.getClassroomSubTitle(),
                    classroom.getClassroomCode(),
                    classroom.getOrganization().getOrgId(),
                    classroom.getCreatedAt()
            );
            classroomDTOs.add(classroomDTO);
        });
        return classroomDTOs;
    }

    /*
     * create classroom with details
     */
    @Override
    public ClassroomDTO createClassroom(ClassroomDTO classroomDTO) {
        Classroom classroom = new Classroom();
        classroom.setClassroomTitle(classroomDTO.getClassroomTitle());
        classroom.setClassroomSubTitle(classroomDTO.getClassroomSubTitle());
        classroom.setClassroomCode(classroomDTO.getClassroomCode());
        classroom.setOrganization(new Organization(classroomDTO.getOrganizationId()));
        Classroom addedClass = classroomRepository.save(classroom);
        classroomDTO.setClassroomId(addedClass.getClassroomId());
        return classroomDTO;
    }

    /*
     * delete classroom by ID
     */
    @Override
    public ResponseEntity<?> deleteClassroom(String classId) {
        Optional<Classroom> classroomData = this.classroomRepository.findById(classId);
        if (classroomData.isPresent()){
            this.classroomRepository.deleteById(classId);
            return ResponseEntity.ok().body(null);
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<?> getClassroomDetailsById(String classroomId) {
        Optional<Classroom> classroomData = this.classroomRepository.findById(classroomId);
        if (classroomData.isPresent()){
            Classroom classroom = classroomData.get();
            ClassroomDTO response = new ClassroomDTO(
                    classroom.getClassroomId(),
                    classroom.getClassroomTitle(),
                    classroom.getClassroomSubTitle(),
                    classroom.getClassroomCode(),
                    classroom.getOrganization().getOrgId(),
                    classroom.getCreatedAt()
            );
            return ResponseEntity.ok().body(response);
        }
        return ResponseEntity.notFound().build();
    }
}
