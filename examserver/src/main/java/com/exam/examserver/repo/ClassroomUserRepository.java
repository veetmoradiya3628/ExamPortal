package com.exam.examserver.repo;

import com.exam.examserver.entity.Classroom;
import com.exam.examserver.entity.ClassroomUser;
import com.exam.examserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomUserRepository extends JpaRepository<ClassroomUser, String> {
    List<ClassroomUser> findByClassroomAndUser(Classroom c, User u);
}
