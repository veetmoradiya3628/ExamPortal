package com.exam.examserver.repo;

import com.exam.examserver.entity.Classroom;
import com.exam.examserver.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, String> {
    List<Classroom> findByOrganization(Organization organization);
}
